import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentModel } from './entities/content-model.entity';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { CreateContentModelDto, UpdateContentModelDto } from './dto/content-model.dto';

@Injectable()
export class ContentModelService {
  private readonly logger = new Logger(ContentModelService.name);

  constructor(
    @InjectRepository(ContentModel)
    private modelRepository: Repository<ContentModel>,
    @InjectRepository(ContentAttribute)
    private attributeRepository: Repository<ContentAttribute>,
    @InjectRepository(ContentAttributeValue)
    private attributeValueRepository: Repository<ContentAttributeValue>,
  ) {}

  async create(createDto: CreateContentModelDto): Promise<ContentModel> {
    try {
      this.logger.log(`开始创建内容模型: ${JSON.stringify(createDto)}`);

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

      this.logger.log(`内容模型创建成功: ${savedModel.id}`);
      return this.findOne(savedModel.id);
    } catch (error) {
      this.logger.error(`创建内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<ContentModel[]> {
    try {
      this.logger.log('开始获取所有内容模型');
      const models = await this.modelRepository.find({
        relations: ['attributes', 'attributeValues'],
        order: {
          sort: 'ASC',
          createdAt: 'DESC',
        }
      });
      this.logger.log(`获取到 ${models.length} 个内容模型`);
      return models;
    } catch (error) {
      this.logger.error(`获取所有内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(id: number): Promise<ContentModel> {
    try {
      this.logger.log(`开始获取内容模型: ${id}`);
      const model = await this.modelRepository.findOne({
        where: { id },
        relations: ['attributes', 'attributeValues'],
      });

      if (!model) {
        this.logger.warn(`内容模型不存在: ${id}`);
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

      this.logger.log(`获取内容模型成功: ${id}`);
      return model;
    } catch (error) {
      this.logger.error(`获取内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: number, updateDto: UpdateContentModelDto): Promise<ContentModel> {
    try {
      this.logger.log(`开始更新内容模型: ${id}, ${JSON.stringify(updateDto)}`);
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

      this.logger.log(`更新内容模型成功: ${id}`);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`更新内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      this.logger.log(`开始删除内容模型: ${id}`);
      const model = await this.findOne(id);
      await this.modelRepository.remove(model);
      this.logger.log(`删除内容模型成功: ${id}`);
    } catch (error) {
      this.logger.error(`删除内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getModelAttributes(id: number): Promise<ContentAttribute[]> {
    try {
      this.logger.log(`开始获取内容模型属性: ${id}`);
      const model = await this.findOne(id);
      this.logger.log(`获取内容模型属性成功: ${id}`);
      return model.attributes;
    } catch (error) {
      this.logger.error(`获取内容模型属性失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async updateModelAttributes(id: number, attributeIds: number[]): Promise<ContentModel> {
    try {
      this.logger.log(`开始更新内容模型属性: ${id}, ${JSON.stringify(attributeIds)}`);
      const model = await this.findOne(id);
      
      // 1. 验证属性是否存在
      const attributes = await this.attributeRepository.findByIds(attributeIds);
      if (attributes.length !== attributeIds.length) {
        throw new NotFoundException('部分属性不存在');
      }

      // 2. 更新模型的属性
      model.attributes = attributes;
      const updatedModel = await this.modelRepository.save(model);
      this.logger.log(`更新内容模型属性成功: ${id}`);
      return updatedModel;
    } catch (error) {
      this.logger.error(`更新内容模型属性失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getModelAttributeValues(id: number): Promise<ContentAttributeValue[]> {
    try {
      this.logger.log(`开始获取内容模型属性值: ${id}`);
      const model = await this.findOne(id);
      this.logger.log(`获取内容模型属性值成功: ${id}`);
      return model.attributeValues;
    } catch (error) {
      this.logger.error(`获取内容模型属性值失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async updateModelAttributeValues(
    id: number, 
    attributeValues: { attributeValueId: number; isEnabled?: boolean; sort?: number; }[]
  ): Promise<ContentModel> {
    try {
      this.logger.log(`开始更新内容模型属性值: ${id}, ${JSON.stringify(attributeValues)}`);
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
      const updatedModel = await this.modelRepository.save(model);
      this.logger.log(`更新内容模型属性值成功: ${id}`);
      return updatedModel;
    } catch (error) {
      this.logger.error(`更新内容模型属性值失败: ${error.message}`, error.stack);
      throw error;
    }
  }
} 