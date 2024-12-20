import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, QueryFailedError, In } from 'typeorm';
import { Content } from './entities/content.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { ContentAttributeRelation } from './entities/content-attribute-relation.entity';
import { CreateContentDto } from './dto/content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(ContentAttributeValue)
    private readonly attributeValueRepository: Repository<ContentAttributeValue>,
    @InjectRepository(ContentAttributeRelation)
    private readonly attributeRelationRepository: Repository<ContentAttributeRelation>,
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

  async create(createContentDto: CreateContentDto) {
    try {
      // 验证必填字段
      if (!createContentDto.categoryId) {
        throw new BadRequestException('分类ID不能为空');
      }

      // 创建内容实例
      const content = this.contentRepository.create({
        ...createContentDto,
        viewCount: 0,
        commentCount: 0,
        likeCount: 0,
        favoriteCount: 0,
        shareCount: 0,
        publishedAt: createContentDto.publishedAt ? new Date(createContentDto.publishedAt) : null
      });

      // 保存内容
      const savedContent = await this.contentRepository.save(content);

      // 如果有属性值，保存属性值关联
      if (createContentDto.attributeValueIds?.length) {
        // 使用 In 操作符查找属性值
        const attributeValues = await this.attributeValueRepository.find({
          where: {
            id: In(createContentDto.attributeValueIds)
          }
        });
        
        const relations = attributeValues.map(value => {
          return this.attributeRelationRepository.create({
            content: savedContent,
            attributeValue: value,
          });
        });

        await this.attributeRelationRepository.save(relations);
      }

      // 返回完整的内容信息
      return this.findOne(savedContent.id);

    } catch (error) {
      // 详细的错误日志
      console.error('创建内容失败:', {
        error,
        dto: createContentDto,
        message: error.message,
        stack: error.stack,
      });

      if (error instanceof QueryFailedError) {
        throw new BadRequestException('创建内容失败：数据库错误');
      }

      throw error;
    }
  }

  // 保存属性值关联
  private async saveAttributeValues(contentId: number, attributeValueIds: number[]) {
    try {
      // 创建属性值关联
      const relations = attributeValueIds.map(valueId => {
        return this.attributeRelationRepository.create({
          content: { id: contentId } as Content,
          attributeValue: { id: valueId } as ContentAttributeValue,
        });
      });

      await this.attributeRelationRepository.save(relations);
    } catch (error) {
      console.error('保存属性值关联失败:', error);
      throw new BadRequestException('保存属性值关联失败');
    }
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

  async getContentAttributeValues(id: number) {
    try {
      // 只获取已选择的属性值关联
      const relations = await this.attributeRelationRepository
        .createQueryBuilder('relation')
        .leftJoinAndSelect('relation.attributeValue', 'attributeValue')
        .leftJoinAndSelect('attributeValue.attribute', 'attribute')
        .where('relation.content = :id', { id })
        .getMany();

      // 转换为更易于前端使用的格式
      const result = relations.map(relation => ({
        attributeId: relation.attributeValue.attribute.id,
        attributeName: relation.attributeValue.attribute.name,
        attributeType: relation.attributeValue.attribute.type,
        valueId: relation.attributeValue.id,
        value: relation.attributeValue.value
      }));

      return result;
    } catch (error) {
      console.error('获取内容属性值关联失败:', error);
      throw new BadRequestException('获取内容属性值关联失败');
    }
  }
} 