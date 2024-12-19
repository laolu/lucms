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
    const query = `
      SELECT 
        c.*,
        m.id as model_id,
        m.name as model_name,
        m.description as model_description
      FROM content_categories c
      LEFT JOIN content_models m ON c.modelId = m.id
      ORDER BY c.sort ASC, c.createdAt DESC
    `;

    const results = await this.categoryRepository.query(query);
    if (!results || results.length === 0) {
      return [];
    }

    // 转换结果为所需的数据结构
    const categories = results.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      parentId: row.parentId,
      modelId: row.modelId,
      sort: row.sort,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      model: row.model_id ? {
        id: row.model_id,
        name: row.model_name,
        description: row.model_description
      } : null
    }));

    console.log('查询到的分类列表:', JSON.stringify(categories, null, 2));
    return categories;
  }

  async findOne(id: number): Promise<ContentCategory> {
    const basicQuery = `
      SELECT 
        c.*,
        m.id as model_id,
        m.name as model_name,
        m.description as model_description
      FROM content_categories c
      LEFT JOIN content_models m ON c.modelId = m.id
      WHERE c.id = ?
    `;

    const [category] = await this.categoryRepository.query(basicQuery, [id]);
    
    if (!category) {
      throw new NotFoundException('分类不存在');
    }

    // 转换为 ContentCategory 类型
    const contentCategory = new ContentCategory();
    Object.assign(contentCategory, {
      id: category.id,
      name: category.name,
      description: category.description,
      parentId: category.parentId,
      modelId: category.modelId,
      sort: category.sort,
      isActive: category.isActive,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      parent: null,
      children: [],
      contents: [],
      model: null
    });

    // 如果分类关联了模型，获取模型详细信息
    if (category.modelId) {
      contentCategory.model = await this.getCategoryModel(id);
    }

    return contentCategory;
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

    // 重新获更新后的分类
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
    // 首先获取所有分类
    const query = `
      SELECT 
        c.id,
        c.name,
        c.description,
        c.parentId,
        c.modelId,
        c.sort,
        c.isActive,
        c.createdAt,
        c.updatedAt,
        m.id as model_id,
        m.name as model_name,
        m.description as model_description
      FROM content_categories c
      LEFT JOIN content_models m ON c.modelId = m.id
      ORDER BY c.sort ASC, c.createdAt DESC
    `;

    const results = await this.categoryRepository.query(query);
    if (!results || results.length === 0) {
      return [];
    }

    // 转换结果为所需的数据结构
    const categories = results.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      parentId: row.parentId,
      modelId: row.modelId,
      sort: row.sort,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      children: [],
      model: row.model_id ? {
        id: row.model_id,
        name: row.model_name,
        description: row.model_description
      } : null
    }));

    return this.buildTree(categories);
  }

  // 获取分类关联的模型信息
  async getCategoryModel(id: number): Promise<any> {
    const query = `
      SELECT 
        m.id,
        m.name,
        m.description,
        m.sort,
        m.isActive,
        m.createdAt,
        m.updatedAt,
        ma.attributeId,
        a.name as attributeName,
        a.type as attributeType,
        a.sort as attributeSort,
        av.id as valueId,
        av.value,
        av.sort as valueSort
      FROM content_categories c
      JOIN content_models m ON c.modelId = m.id
      LEFT JOIN content_model_attributes ma ON m.id = ma.modelId
      LEFT JOIN content_attributes a ON ma.attributeId = a.id
      LEFT JOIN content_attribute_values av ON a.id = av.attributeId
      WHERE c.id = ?
      ORDER BY a.sort ASC, av.sort ASC
    `;

    const results = await this.categoryRepository.query(query, [id]);
    if (!results || results.length === 0) {
      return null;
    }

    // 构建模型数据结构
    const model = {
      id: results[0].id,
      name: results[0].name,
      description: results[0].description,
      sort: results[0].sort,
      isActive: results[0].isActive,
      createdAt: results[0].createdAt,
      updatedAt: results[0].updatedAt,
      attributes: []
    };

    // 处理属性和值
    const attributesMap = new Map();
    results.forEach(row => {
      if (row.attributeId && !attributesMap.has(row.attributeId)) {
        attributesMap.set(row.attributeId, {
          id: row.attributeId,
          name: row.attributeName,
          type: row.attributeType,
          sort: row.attributeSort,
          values: []
        });
      }

      if (row.valueId) {
        const attribute = attributesMap.get(row.attributeId);
        if (attribute && !attribute.values.some(v => v.id === row.valueId)) {
          attribute.values.push({
            id: row.valueId,
            value: row.value,
            isChecked: row.isChecked,
            sort: row.valueSort
          });
        }
      }
    });

    // 将属性添加到模型中并排序
    model.attributes = Array.from(attributesMap.values())
      .sort((a, b) => a.sort - b.sort);

    // 对每个属性的值进行排序
    model.attributes.forEach(attr => {
      attr.values.sort((a, b) => a.sort - b.sort);
    });

    console.log('分类关联的模型:', JSON.stringify(model, null, 2));
    return model;
  }

  private buildTree(items: ContentCategory[], parentId: number = 0): ContentCategory[] {
    return items
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        children: this.buildTree(items, item.id)
      }));
  }

  async getContentTree(): Promise<ContentCategory[]> {
    // 获取所有启用的分类
    const categories = await this.categoryRepository.find({
      where: { isActive: true }, // 注意：这里应该使用 isActive 而不是 status
      order: {
        sort: 'ASC',
        createdAt: 'DESC',
      },
      relations: ['model'], // 如果需要加载关联的模型信息
    });

    // 转换为树形结构
    return this.buildTree(categories);
  }
} 