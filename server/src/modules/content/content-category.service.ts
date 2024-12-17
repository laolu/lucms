import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentCategory } from './entities/content-category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ContentModel } from './entities/content-model.entity';

@Injectable()
export class ContentCategoryService {
  private readonly logger = new Logger(ContentCategoryService.name);

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

    const category = this.categoryRepository.create(createDto);
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
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'children', 'model', 'model.attributes'],
    });

    if (!category) {
      throw new NotFoundException('分类不存在');
    }

    return category;
  }

  async update(id: number, updateDto: Partial<CreateCategoryDto>): Promise<ContentCategory> {
    const category = await this.findOne(id);

    // 如果要更新模型ID，验证模型是否存在
    if (updateDto.modelId) {
      const model = await this.modelRepository.findOne({
        where: { id: updateDto.modelId }
      });
      if (!model) {
        throw new NotFoundException('内容模型不存在');
      }
    }

    Object.assign(category, updateDto);
    return await this.categoryRepository.save(category);
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
      category.parentId = null;
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
        parentId === null ? category.parentId === 0 || !category.parentId : category.parentId === parentId
      )
      .map(category => ({
        ...category,
        children: this.buildTree(categories, category.id)
      }));
  }
} 