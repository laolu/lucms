import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentComment } from './entities/content-comment.entity';
import { Content } from './entities/content.entity';
import { User } from '../users/entities/user.entity';
import { CreateContentCommentDto } from './dto/create-content-comment.dto';
import { IsNull } from 'typeorm';

@Injectable()
export class ContentCommentService {
  constructor(
    @InjectRepository(ContentComment)
    private commentRepository: Repository<ContentComment>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create(createDto: CreateContentCommentDto, user: User): Promise<ContentComment> {
    const content = await this.contentRepository.findOne({
      where: { id: createDto.contentId },
    });

    if (!content) {
      throw new NotFoundException('内容不存在');
    }

    let parent: ContentComment | null = null;
    if (createDto.parentId) {
      parent = await this.commentRepository.findOne({
        where: { id: createDto.parentId },
      });
      if (!parent) {
        throw new NotFoundException('父评论不存在');
      }
    }

    const comment = this.commentRepository.create({
      commentContent: createDto.content,
      content,
      user,
      parentId: createDto.parentId || null,
    });

    return this.commentRepository.save(comment);
  }

  async findByContent(contentId: number): Promise<ContentComment[]> {
    return this.commentRepository.find({
      where: {
        content: { id: contentId },
        parentId: IsNull()
      },
      relations: ['user', 'children', 'children.user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async delete(id: number, user: User): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('评论不存在');
    }

    if (comment.user.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('无权删除此评论');
    }

    await this.commentRepository.softDelete(id);
  }

  async like(id: number): Promise<ContentComment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('评论不存在');
    }

    comment.likes += 1;
    return this.commentRepository.save(comment);
  }
} 