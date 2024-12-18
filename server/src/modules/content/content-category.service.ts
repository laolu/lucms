import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentCategory } from './entities/content-category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ContentModel } from './entities/content-model.entity';

@Injectable()
export class ContentCategoryService {
  constructor(
    @InjectRepository(ContentCategory)
    private categoryRepository: Repository<ContentCategory>,
    @InjectRepository(ContentModel)
    private modelRepository: Repository<ContentModel>,
  ) {}

  async create(createDto: CreateCategoryDto): Promise<ContentCategory> {
    // 如果指定了模型ID，验证模型是否存在
    if (createDto.modelId) {
      const model = await this.modelRepository.findOne({
        where: { id: createDto.modelId }
      });
      if (!model) {
        throw new NotFoundException('内容模型不存在');
      }
    }

    // 确保 parentId 有默认值 0
    const category = this.categoryRepository.create({
      ...createDto,
      parentId: createDto.parentId ?? 0
    });
    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<ContentCategory[]> {
    const categories = await this.categoryRepository.find({
      relations: ['parent', 'children', 'model'],
      order: {
        sort: 'ASC',
        createdAt: 'DESC',
      }
    });
    
    if (!categories || categories.length === 0) {
      return [];
    }
    
    return categories;
  }

  async findOne(id: number): Promise<ContentCategory> {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.model', 'model')
      .leftJoinAndSelect('model.attributes', 'modelAttribute')
      .leftJoinAndSelect('modelAttribute.attribute', 'attribute')
      .leftJoinAndSelect('attribute.values', 'attributeValue')
      .where('category.id = :id', { id })
      .orderBy({
        'modelAttribute.sort': 'ASC',
        'attributeValue.sort': 'ASC'
      })
      .getOne();

    if (!category) {
      throw new NotFoundException('分类不存在');
    }

    return category;
  }

  async update(id: number, updateDto: Partial<CreateCategoryDto>): Promise<ContentCategory> {
    console.log('更新分类，接收到的数据:', updateDto);
    console.log('parentId 类型:', typeof updateDto.parentId);
    console.log('parentId 值:', updateDto.parentId);

    const existingCategory = await this.findOne(id);

    // 如果要更新模型ID，验证模型是否存在
    if (updateDto.modelId) {
      const model = await this.modelRepository.findOne({
        where: { id: updateDto.modelId }
      });
      if (!model) {
        throw new NotFoundException('内容模型不存在');
      }
    }

    // 准备更新数据
    const updateData = {
      name: updateDto.name ?? existingCategory.name,
      description: updateDto.description ?? existingCategory.description,
      sort: updateDto.sort ?? existingCategory.sort,
      isActive: updateDto.isActive ?? existingCategory.isActive,
      modelId: updateDto.modelId ?? existingCategory.modelId,
      parentId: updateDto.parentId ?? existingCategory.parentId ?? 0, // 确保有值
    };

    console.log('准备更新的数据:', updateData);
    
    // 使用 update 方法更新数据
    await this.categoryRepository.update(id, updateData);

    // 重新获取更新后的分类
    const updatedCategory = await this.findOne(id);
    console.log('更新后的分类:', updatedCategory);
    return updatedCategory;
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }

  async updateStatus(id: number, isActive: boolean): Promise<ContentCategory> {
    const category = await this.findOne(id);
    category.isActive = isActive;
    return await this.categoryRepository.save(category);
  }

  async updateSort(id: number, sort: number): Promise<ContentCategory> {
    const category = await this.findOne(id);
    category.sort = sort;
    return await this.categoryRepository.save(category);
  }

  async move(id: number, parentId: number | null): Promise<ContentCategory> {
    const category = await this.findOne(id);
    
    if (parentId) {
      const parent = await this.findOne(parentId);
      category.parent = parent;
      category.parentId = parent.id;
    } else {
      category.parent = null;
      category.parentId = 0;
    }

    return await this.categoryRepository.save(category);
  }

  async getTree(): Promise<ContentCategory[]> {
    const categories = await this.findAll();
    return this.buildTree(categories);
  }

  private buildTree(categories: ContentCategory[], parentId: number | null = null): ContentCategory[] {
    return categories
      .filter(category => 
        parentId === null ? category.parentId === 0 : category.parentId === parentId
      )
      .map(category => ({
        ...category,
        children: this.buildTree(categories, category.id)
      }));
  }
} 