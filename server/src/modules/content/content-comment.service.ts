import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentComment } from './entities/content-comment.entity';
import { Content } from './entities/content.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ContentCommentService {
  constructor(
    @InjectRepository(ContentComment)
    private commentRepository: Repository<ContentComment>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create(createDto: CreateCommentDto, user: User): Promise<ContentComment> {
    const content = await this.contentRepository.findOne({
      where: { id: createDto.contentId }
    });

    if (!content) {
      throw new NotFoundException(`Content with ID ${createDto.contentId} not found`);
    }

    let parent: ContentComment | null = null;
    if (createDto.parentId) {
      parent = await this.commentRepository.findOne({
        where: { id: createDto.parentId }
      });
      if (!parent) {
        throw new NotFoundException(`Parent comment with ID ${createDto.parentId} not found`);
      }
    }

    const comment = this.commentRepository.create({
      commentContent: createDto.content,
      content,
      user,
      parentId: createDto.parentId || 0,
    });

    const savedComment = await this.commentRepository.save(comment);

    // 更新内容的评论数
    await this.contentRepository.increment({ id: createDto.contentId }, 'commentCount', 1);

    return this.findOne(savedComment.id);
  }

  async findAll(contentId: number): Promise<ContentComment[]> {
    return await this.commentRepository.find({
      where: { contentId },
      relations: ['user', 'parent', 'children'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<ContentComment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'parent', 'children'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async update(id: number, content: string, user: User): Promise<ContentComment> {
    const comment = await this.findOne(id);

    if (comment.userId !== user.id && !user.isAdmin) {
      throw new ForbiddenException('You can only update your own comments');
    }

    comment.commentContent = content;
    return await this.commentRepository.save(comment);
  }

  async delete(id: number, user: User): Promise<void> {
    const comment = await this.findOne(id);

    if (comment.userId !== user.id && !user.isAdmin) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    // 如果有子评论，只标记为不活跃
    if (comment.children && comment.children.length > 0) {
      comment.isActive = false;
      await this.commentRepository.save(comment);
    } else {
      await this.commentRepository.remove(comment);
    }

    // 更新内容的评论数
    await this.contentRepository.decrement({ id: comment.contentId }, 'commentCount', 1);
  }

  async like(id: number): Promise<void> {
    await this.commentRepository.increment({ id }, 'likeCount', 1);
  }

  async getCommentTree(contentId: number): Promise<ContentComment[]> {
    const comments = await this.findAll(contentId);
    return this.buildCommentTree(comments);
  }

  private buildCommentTree(comments: ContentComment[], parentId: number = 0): ContentComment[] {
    const result: ContentComment[] = [];
    
    for (const comment of comments) {
      if (comment.parentId === parentId) {
        const children = this.buildCommentTree(comments, comment.id);
        if (children.length) {
          comment.children = children;
        }
        result.push(comment);
      }
    }
    
    return result;
  }
} 