import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentModel } from './entities/content-model.entity';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { CreateContentModelDto, UpdateContentModelDto } from './dto/content-model.dto';

@Injectable()
export class ContentModelService {
  constructor(
    @InjectRepository(ContentModel)
    private modelRepository: Repository<ContentModel>,
    @InjectRepository(ContentAttribute)
    private attributeRepository: Repository<ContentAttribute>,
    @InjectRepository(ContentAttributeValue)
    private attributeValueRepository: Repository<ContentAttributeValue>,
  ) {}

  async create(createDto: CreateContentModelDto): Promise<ContentModel> {
    // 1. 验证属性是否存在
    const attributes = await this.attributeRepository.findByIds(createDto.attributeIds);
    if (attributes.length !== createDto.attributeIds.length) {
      throw new NotFoundException('部分属性不存在');
    }

    // 2. 验证属性值是否存在
    const attributeValueIds = createDto.attributeValues.map(av => av.attributeValueId);
    const attributeValues = await this.attributeValueRepository.findByIds(attributeValueIds);
    if (attributeValues.length !== attributeValueIds.length) {
      throw new NotFoundException('部分属性值不存在');
    }

    // 3. 创建模型
    const model = this.modelRepository.create({
      name: createDto.name,
      description: createDto.description,
      sort: createDto.sort,
      isActive: createDto.isActive,
      attributes: attributes,
      attributeValues: attributeValues,
    });

    // 4. 保存模型及其关联
    const savedModel = await this.modelRepository.save(model);

    // 5. 更新关联表中的额外字段
    if (createDto.attributeValues.length > 0) {
      await this.modelRepository
        .createQueryBuilder()
        .insert()
        .into('content_model_attribute_values')
        .values(
          createDto.attributeValues.map(av => ({
            modelId: savedModel.id,
            attributeValueId: av.attributeValueId,
            isEnabled: av.isEnabled ?? true,
            sort: av.sort ?? 0,
          }))
        )
        .execute();
    }

    return this.findOne(savedModel.id);
  }

  async findAll(): Promise<ContentModel[]> {
    return await this.modelRepository.find({
      relations: ['attributes', 'attributeValues'],
      order: {
        sort: 'ASC',
        createdAt: 'DESC',
      }
    });
  }

  async findOne(id: number): Promise<ContentModel> {
    const model = await this.modelRepository.findOne({
      where: { id },
      relations: ['attributes', 'attributeValues'],
    });

    if (!model) {
      throw new NotFoundException('内容模型不存在');
    }

    // 获取属性值的额外字段
    const attributeValuesWithExtra = await this.modelRepository
      .createQueryBuilder()
      .select('cmav.*')
      .from('content_model_attribute_values', 'cmav')
      .where('cmav.modelId = :modelId', { modelId: id })
      .getRawMany();

    // 合并额外字段到模型的属性值中
    model.attributeValues = model.attributeValues.map(av => {
      const extra = attributeValuesWithExtra.find(e => e.attributeValueId === av.id);
      return {
        ...av,
        isEnabled: extra?.isEnabled ?? true,
        sort: extra?.sort ?? 0,
      };
    });

    return model;
  }

  async update(id: number, updateDto: UpdateContentModelDto): Promise<ContentModel> {
    const model = await this.findOne(id);

    // 1. 验证属性是否存在
    const attributes = await this.attributeRepository.findByIds(updateDto.attributeIds);
    if (attributes.length !== updateDto.attributeIds.length) {
      throw new NotFoundException('部分属性不存在');
    }

    // 2. 验证属性值是否存在
    const attributeValueIds = updateDto.attributeValues.map(av => av.attributeValueId);
    const attributeValues = await this.attributeValueRepository.findByIds(attributeValueIds);
    if (attributeValues.length !== attributeValueIds.length) {
      throw new NotFoundException('部分属性值不存在');
    }

    // 3. 更新基本信息和关联
    Object.assign(model, {
      name: updateDto.name,
      description: updateDto.description,
      sort: updateDto.sort,
      isActive: updateDto.isActive,
      attributes: attributes,
      attributeValues: attributeValues,
    });

    // 4. 保存模型
    await this.modelRepository.save(model);

    // 5. 更新属性值关联表
    // 先删除旧的关联
    await this.modelRepository
      .createQueryBuilder()
      .delete()
      .from('content_model_attribute_values')
      .where('modelId = :modelId', { modelId: id })
      .execute();

    // 添加新的关联
    if (updateDto.attributeValues.length > 0) {
      await this.modelRepository
        .createQueryBuilder()
        .insert()
        .into('content_model_attribute_values')
        .values(
          updateDto.attributeValues.map(av => ({
            modelId: id,
            attributeValueId: av.attributeValueId,
            isEnabled: av.isEnabled ?? true,
            sort: av.sort ?? 0,
          }))
        )
        .execute();
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const model = await this.findOne(id);
    await this.modelRepository.remove(model);
  }

  async getModelAttributes(id: number): Promise<ContentAttribute[]> {
    const model = await this.findOne(id);
    return model.attributes;
  }

  async updateModelAttributes(id: number, attributeIds: number[]): Promise<ContentModel> {
    const model = await this.findOne(id);
    
    // 1. 验证属性是否存在
    const attributes = await this.attributeRepository.findByIds(attributeIds);
    if (attributes.length !== attributeIds.length) {
      throw new NotFoundException('部分属性不存在');
    }

    // 2. 更新模型的属性
    model.attributes = attributes;
    return await this.modelRepository.save(model);
  }

  async getModelAttributeValues(id: number): Promise<ContentAttributeValue[]> {
    const model = await this.findOne(id);
    return model.attributeValues;
  }

  async updateModelAttributeValues(
    id: number, 
    attributeValues: { attributeValueId: number; isEnabled?: boolean; sort?: number; }[]
  ): Promise<ContentModel> {
    const model = await this.findOne(id);

    // 1. 验证属性值是否存在
    const attributeValueIds = attributeValues.map(av => av.attributeValueId);
    const values = await this.attributeValueRepository.findByIds(attributeValueIds);
    if (values.length !== attributeValueIds.length) {
      throw new NotFoundException('部分属性值不存在');
    }

    // 2. 更新关联表
    await this.modelRepository
      .createQueryBuilder()
      .delete()
      .from('content_model_attribute_values')
      .where('modelId = :modelId', { modelId: id })
      .execute();

    if (attributeValues.length > 0) {
      await this.modelRepository
        .createQueryBuilder()
        .insert()
        .into('content_model_attribute_values')
        .values(
          attributeValues.map(av => ({
            modelId: id,
            attributeValueId: av.attributeValueId,
            isEnabled: av.isEnabled ?? true,
            sort: av.sort ?? 0,
          }))
        )
        .execute();
    }

    model.attributeValues = values;
    return await this.modelRepository.save(model);
  }
} 