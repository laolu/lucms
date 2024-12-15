import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentCategory } from './entities/content-category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryAttribute } from './entities/category-attribute.entity';
import { CategoryAttributeValue } from './entities/category-attribute-value.entity';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';

@Injectable()
export class ContentCategoryService {
  private readonly logger = new Logger(ContentCategoryService.name);

  constructor(
    @InjectRepository(ContentCategory)
    private categoryRepository: Repository<ContentCategory>,
    @InjectRepository(CategoryAttribute)
    private categoryAttributeRepository: Repository<CategoryAttribute>,
    @InjectRepository(CategoryAttributeValue)
    private categoryAttributeValueRepository: Repository<CategoryAttributeValue>,
  ) {}

  async create(createDto: CreateCategoryDto): Promise<ContentCategory> {
    const category = this.categoryRepository.create(createDto);
    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<ContentCategory[]> {
    this.logger.debug('开始查询所有分类');
    try {
      const categories = await this.categoryRepository.find({
        relations: ['parent', 'children'],
        order: {
          sort: 'ASC',
          createdAt: 'DESC',
        }
      });
      
      if (!categories || categories.length === 0) {
        this.logger.warn('没有找到任何分类数据');
        return [];
      }
      
      this.logger.debug(`找到 ${categories.length} 个分类:`, 
        categories.map(c => ({
          id: c.id,
          name: c.name,
          parentId: c.parentId,
          sort: c.sort
        }))
      );
      return categories;
    } catch (error) {
      this.logger.error('查询分类失败:', error);
      throw error;
    }
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
    this.logger.debug('Starting to get category tree');
    // Get all categories
    const allCategories = await this.findAll();
    this.logger.debug('All categories:', allCategories);
    
    // Find root nodes (parentId is null or 0)
    const rootCategories = allCategories.filter(category => !category.parentId || category.parentId === 0);
    this.logger.debug('Root categories:', rootCategories);
    
    // Build tree for each root node
    const tree = rootCategories.map(root => {
      this.logger.debug(`Building tree for root node ${root.id}`);
      // Recursively build subtree
      const children = this.buildTree(allCategories, root.id);
      this.logger.debug(`Children for root node ${root.id}:`, children);
      if (children.length) {
        root.children = children;
      }
      return root;
    });

    this.logger.debug('Final tree structure:', tree);
    return tree;
  }

  private buildTree(categories: ContentCategory[], parentId: number): ContentCategory[] {
    this.logger.debug(`Building tree for parent ID ${parentId}`);
    const result: ContentCategory[] = [];
    
    // Find direct children of the current parent
    const children = categories.filter(category => category.parentId === parentId);
    this.logger.debug(`Found direct children for parent ID ${parentId}:`, children);
    
    // Recursively build subtree for each child
    for (const child of children) {
      const subChildren = this.buildTree(categories, child.id);
      if (subChildren.length) {
        child.children = subChildren;
      }
      result.push(child);
    }
    
    return result;
  }

  async updateSort(id: number, targetSort: number): Promise<ContentCategory> {
    const category = await this.findOne(id);
    const oldSort = category.sort;
    const parentId = category.parentId;

    this.logger.debug(`Updating sort for category ${id}:`, {
      oldSort,
      targetSort,
      parentId
    });

    // Start transaction
    const queryRunner = this.categoryRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Get siblings and sort them by sort value
      const siblings = await queryRunner.manager.find(ContentCategory, {
        where: { parentId: parentId || null },
        order: { sort: 'ASC' },
      });

      this.logger.debug('Current siblings order:', siblings.map(s => ({ id: s.id, sort: s.sort })));

      // Ensure target sort value is within valid range
      const maxSort = siblings.length - 1;
      const validTargetSort = Math.max(0, Math.min(targetSort, maxSort));

      this.logger.debug(`Adjusted target sort from ${targetSort} to ${validTargetSort}`);

      // If sort values are the same, no update is needed
      if (oldSort === validTargetSort) {
        this.logger.debug('Sort values are the same, no update needed');
        return category;
      }

      // Update affected categories' sort
      if (validTargetSort > oldSort) {
        // Move forward: shift categories before the target category
        await queryRunner.manager.createQueryBuilder()
          .update(ContentCategory)
          .set({ sort: () => 'sort - 1' })
          .where('parentId = :parentId AND sort > :oldSort AND sort <= :newSort', {
            parentId: parentId || null,
            oldSort,
            newSort: validTargetSort,
          })
          .execute();
      } else {
        // Move backward: shift categories after the target category
        await queryRunner.manager.createQueryBuilder()
          .update(ContentCategory)
          .set({ sort: () => 'sort + 1' })
          .where('parentId = :parentId AND sort >= :newSort AND sort < :oldSort', {
            parentId: parentId || null,
            oldSort,
            newSort: validTargetSort,
          })
          .execute();
      }

      // Update current category's sort
      category.sort = validTargetSort;
      await queryRunner.manager.save(ContentCategory, category);

      // Re-sort all siblings to ensure continuous sort values
      const updatedSiblings = await queryRunner.manager.find(ContentCategory, {
        where: { parentId: parentId || null },
        order: { sort: 'ASC' },
      });

      for (let i = 0; i < updatedSiblings.length; i++) {
        if (updatedSiblings[i].sort !== i) {
          await queryRunner.manager.update(
            ContentCategory,
            updatedSiblings[i].id,
            { sort: i }
          );
        }
      }

      this.logger.debug('Final siblings order:', updatedSiblings.map(s => ({ id: s.id, sort: s.sort })));

      await queryRunner.commitTransaction();
      this.logger.debug('Sort update transaction committed successfully');
      return category;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Failed to update sort:', err);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async move(id: number, targetId: number): Promise<ContentCategory> {
    const category = await this.findOne(id);
    const targetCategory = await this.findOne(targetId);
    
    // Start transaction
    const queryRunner = this.categoryRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Update current category's parent ID and sort
      category.parentId = targetCategory.id;
      category.sort = targetCategory.sort + 1; // Place after target category

      // Update sort of other siblings
      await queryRunner.manager.createQueryBuilder()
        .update(ContentCategory)
        .set({ sort: () => 'sort + 1' })
        .where('parentId = :parentId AND sort > :sort', {
          parentId: targetCategory.id,
          sort: targetCategory.sort,
        })
        .execute();

      // Save current category
      const savedCategory = await queryRunner.manager.save(ContentCategory, category);

      await queryRunner.commitTransaction();
      return savedCategory;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getCategoryAttributes(id: number) {
    try {
      this.logger.debug(`Getting attributes for category ${id}`);
      
      const attributes = await this.categoryAttributeRepository
        .createQueryBuilder('ca')
        .leftJoinAndSelect('ca.attribute', 'attr')
        .leftJoinAndSelect('ca.allowedValues', 'av')
        .leftJoinAndSelect('av.attributeValue', 'val')
        .where('ca.categoryId = :categoryId', { categoryId: id })
        .orderBy('ca.sort', 'ASC')
        .addOrderBy('av.sort', 'ASC')
        .getMany();

      this.logger.debug(`Found ${attributes.length} attributes for category ${id}`);

      return attributes.map(attr => ({
        attributeId: attr.attributeId,
        attribute: {
          name: attr.attribute.name,
          type: attr.attribute.type
        },
        values: attr.allowedValues.map(v => ({
          id: v.attributeValueId,
          value: v.attributeValue.value,
          sort: v.sort,
          isEnabled: v.isEnabled
        }))
      }));
    } catch (error) {
      this.logger.error(`Error getting attributes for category ${id}:`, error);
      throw error;
    }
  }

  async updateCategoryAttributes(id: number, data: {
    attributes: Array<{
      attributeId: number;
      valueIds: number[];
    }>;
  }) {
    // 开启事务
    await this.categoryAttributeRepository.manager.transaction(async manager => {
      try {
        this.logger.debug(`Updating attributes for category ${id}`);

        // 1. 先删除所有相关的属性值关联
        await manager
          .createQueryBuilder()
          .delete()
          .from(CategoryAttributeValue)
          .where('categoryAttributeId IN (SELECT id FROM category_attributes WHERE categoryId = :categoryId)', { categoryId: id })
          .execute();

        // 2. 然后删除属性关联
        await manager
          .createQueryBuilder()
          .delete()
          .from(CategoryAttribute)
          .where('categoryId = :categoryId', { categoryId: id })
          .execute();

        // 3. 创建新的关联
        for (const attr of data.attributes) {
          this.logger.debug(`Creating attribute relation for attributeId: ${attr.attributeId}`);
          
          // 创建分类-属性关联
          const categoryAttribute = manager.create(CategoryAttribute, {
            categoryId: id,
            attributeId: attr.attributeId,
            isRequired: true, // 默认必填
            sort: 0 // 默认排序
          });
          const savedCategoryAttribute = await manager.save(CategoryAttribute, categoryAttribute);

          if (attr.valueIds.length > 0) {
            // 创建分类-属性值关联
            const attributeValues = attr.valueIds.map(valueId => 
              manager.create(CategoryAttributeValue, {
                categoryAttributeId: savedCategoryAttribute.id,
                attributeValueId: valueId,
                isEnabled: true, // 默认启用
                sort: 0 // 默认排序
              })
            );
            await manager.save(CategoryAttributeValue, attributeValues);
          }
        }

        this.logger.debug(`Successfully updated attributes for category ${id}`);
      } catch (error) {
        this.logger.error(`Error updating attributes for category ${id}:`, error);
        throw error;
      }
    });

    return this.getCategoryAttributes(id);
  }
} 