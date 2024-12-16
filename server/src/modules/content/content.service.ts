import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Content } from './entities/content.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { ContentAttributeRelation } from './entities/content-attribute-relation.entity';
import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(ContentAttributeValue)
    private attributeValueRepository: Repository<ContentAttributeValue>,
    @InjectRepository(ContentAttributeRelation)
    private attributeRelationRepository: Repository<ContentAttributeRelation>,
  ) {}

  async findAll(query: {
    page: number;
    pageSize: number;
    search?: string;
    categoryId?: number;
    isActive?: boolean;
    sortBy?: string;
    sort?: 'ASC' | 'DESC';
  }) {
    const { search, categoryId, isActive, sortBy, sort, page, pageSize } = query;
    
    const where: any = {};
    if (search) {
      where.title = Like(`%${search}%`);
    }
    if (categoryId !== undefined) {
      where.categoryId = categoryId;
    }
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const order: any = {};
    if (sortBy) {
      order[sortBy] = sort || 'DESC';
    } else {
      order.createdAt = 'DESC';
    }

    const [items, total] = await this.contentRepository.findAndCount({
      where,
      order,
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['category', 'attributeValues', 'attributeValues.attributeValue']
    });

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    };
  }

  async create(createDto: CreateContentDto): Promise<Content> {
    // 创建内容
    const content = this.contentRepository.create({
      title: createDto.title,
      content: createDto.content,
      isActive: createDto.isActive,
      sort: createDto.sort,
    });

    const savedContent = await this.contentRepository.save(content);

    // 处理属性值关联
    if (createDto.attributeValueIds && createDto.attributeValueIds.length > 0) {
      const attributeValues = await this.attributeValueRepository.findByIds(createDto.attributeValueIds);
      
      const relations = attributeValues.map(value => {
        return this.attributeRelationRepository.create({
          content: savedContent,
          attributeValue: value,
        });
      });

      await this.attributeRelationRepository.save(relations);
    }

    return this.findOne(savedContent.id);
  }

  async findOne(id: number): Promise<Content> {
    const content = await this.contentRepository.findOne({
      where: { id },
      relations: ['category', 'attributeValues', 'attributeValues.attributeValue']
    });

    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }

    return content;
  }

  async update(id: number, updateDto: Partial<CreateContentDto>): Promise<Content> {
    const content = await this.findOne(id);

    // 更新基本信息
    if (updateDto.title) content.title = updateDto.title;
    if (updateDto.content) content.content = updateDto.content;
    if (typeof updateDto.isActive !== 'undefined') content.isActive = updateDto.isActive;
    if (typeof updateDto.sort !== 'undefined') content.sort = updateDto.sort;

    await this.contentRepository.save(content);

    // 更新属性值关联
    if (updateDto.attributeValueIds) {
      // 删除旧的关联
      await this.attributeRelationRepository.delete({ content: { id } });

      // 创建新的关联
      const attributeValues = await this.attributeValueRepository.findByIds(updateDto.attributeValueIds);
      
      const relations = attributeValues.map(value => {
        return this.attributeRelationRepository.create({
          content: { id },
          attributeValue: value,
        });
      });

      await this.attributeRelationRepository.save(relations);
    }

    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const content = await this.findOne(id);
    await this.contentRepository.remove(content);
  }

  async incrementViewCount(id: number): Promise<void> {
    await this.contentRepository.increment({ id }, 'viewCount', 1);
  }
} 