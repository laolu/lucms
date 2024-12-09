import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ContentCategory } from './entities/content-category.entity';
import { CreateContentCategoryDto } from './dto/create-content-category.dto';
import { ContentAttribute } from './entities/content-attribute.entity';

@Injectable()
export class ContentCategoryService {
  constructor(
    @InjectRepository(ContentCategory)
    private categoryRepository: Repository<ContentCategory>,
    @InjectRepository(ContentAttribute)
    private attributeRepository: Repository<ContentAttribute>,
  ) {}

  async create(createCategoryDto: CreateContentCategoryDto): Promise<ContentCategory> {
    const category = this.categoryRepository.create(createCategoryDto);
    
    if (createCategoryDto.attributeIds?.length) {
      const attributes = await this.attributeRepository.findBy({
        id: In(createCategoryDto.attributeIds),
      });
      category.attributes = attributes;
    }

    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<ContentCategory[]> {
    return this.categoryRepository.find({
      order: { sort: 'ASC' },
      relations: ['attributes'],
    });
  }

  async findAllTree(): Promise<ContentCategory[]> {
    const categories = await this.findAll();
    return this.buildCategoryTree(categories);
  }

  async findOne(id: number): Promise<ContentCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'children', 'attributes'],
    });
    if (!category) {
      throw new NotFoundException('分类不存在');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: Partial<ContentCategory> & { attributeIds?: number[] }): Promise<ContentCategory> {
    const category = await this.findOne(id);
    
    if (updateCategoryDto.attributeIds !== undefined) {
      const attributes = await this.attributeRepository.findBy({
        id: In(updateCategoryDto.attributeIds),
      });
      category.attributes = attributes;
      delete updateCategoryDto.attributeIds;
    }

    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    // 检查是否有子分类
    if (category.children && category.children.length > 0) {
      throw new Error('请先删除子分类');
    }
    await this.categoryRepository.remove(category);
  }

  async findActiveCategories(): Promise<ContentCategory[]> {
    const categories = await this.categoryRepository.find({
      where: { isActive: true },
      order: { sort: 'ASC' },
      relations: ['attributes'],
    });
    return this.buildCategoryTree(categories);
  }

  private buildCategoryTree(categories: ContentCategory[], parentId: number | null = null): ContentCategory[] {
    const tree: ContentCategory[] = [];

    for (const category of categories) {
      if (category.parentId === parentId) {
        const children = this.buildCategoryTree(categories, category.id);
        if (children.length > 0) {
          category.children = children;
        }
        tree.push(category);
      }
    }

    return tree;
  }
} 