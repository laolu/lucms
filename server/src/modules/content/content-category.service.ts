import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentCategory } from './entities/content-category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class ContentCategoryService {
  constructor(
    @InjectRepository(ContentCategory)
    private categoryRepository: Repository<ContentCategory>,
  ) {}

  async create(createDto: CreateCategoryDto): Promise<ContentCategory> {
    const category = this.categoryRepository.create(createDto);
    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<ContentCategory[]> {
    return await this.categoryRepository.find({
      relations: ['parent', 'children'],
      order: {
        sort: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<ContentCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'children', 'contents'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: number, updateDto: Partial<CreateCategoryDto>): Promise<ContentCategory> {
    const category = await this.findOne(id);
    
    Object.assign(category, updateDto);
    
    return await this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    const category = await this.findOne(id);
    
    // 检查是否有子分类
    if (category.children && category.children.length > 0) {
      throw new Error('Cannot delete category with children');
    }
    
    // 检查是否有关联的内容
    if (category.contents && category.contents.length > 0) {
      throw new Error('Cannot delete category with contents');
    }
    
    await this.categoryRepository.remove(category);
  }

  async getTree(): Promise<ContentCategory[]> {
    const allCategories = await this.findAll();
    return this.buildTree(allCategories);
  }

  private buildTree(categories: ContentCategory[], parentId: number = 0): ContentCategory[] {
    const result: ContentCategory[] = [];
    
    for (const category of categories) {
      if (category.parentId === parentId) {
        const children = this.buildTree(categories, category.id);
        if (children.length) {
          category.children = children;
        }
        result.push(category);
      }
    }
    
    return result;
  }
} 