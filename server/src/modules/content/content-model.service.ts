import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentModel } from './entities/content-model.entity';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { ContentModelAttribute } from './entities/content-model-attribute.entity';
import { ContentModelAttributeValue } from './entities/content-model-attribute-value.entity';
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
    @InjectRepository(ContentModelAttribute)
    private modelAttributeRepository: Repository<ContentModelAttribute>,
    @InjectRepository(ContentModelAttributeValue)
    private modelAttributeValueRepository: Repository<ContentModelAttributeValue>,
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
        sort: createDto.sort ?? 0,
        isActive: createDto.isActive ?? true
      });

      // 4. 保存模型
      const savedModel = await this.modelRepository.save(model);

      // 5. 创建属性关联
      if (createDto.attributeIds.length > 0) {
        const modelAttributes = createDto.attributeIds.map(attributeId => ({
          modelId: savedModel.id,
          attributeId: attributeId
        }));
        await this.modelAttributeRepository
          .createQueryBuilder()
          .insert()
          .into('content_model_attributes')
          .values(modelAttributes)
          .execute();
      }

      // 6. 创建属性值关联
      if (createDto.attributeValues.length > 0) {
        const modelAttributeValues = createDto.attributeValues.map(av => ({
          modelId: savedModel.id,
          attributeId: av.attributeId,
          attributeValueId: av.attributeValueId,
          isEnabled: av.isEnabled ?? true,
          sort: av.sort ?? 0
        }));
        await this.modelAttributeValueRepository
          .createQueryBuilder()
          .insert()
          .into('content_model_attribute_values')
          .values(modelAttributeValues)
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
        relations: {
          attributes: {
            attribute: true
          },
          attributeValues: {
            attribute: true,
            attributeValue: true
          }
        },
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
        relations: {
          attributes: {
            attribute: true
          },
          attributeValues: {
            attribute: true,
            attributeValue: true
          }
        }
      });

      if (!model) {
        this.logger.warn(`内容模型不存在: ${id}`);
        throw new NotFoundException('内容模型不存在');
      }

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

      // 3. 更新基本信息
      Object.assign(model, {
        name: updateDto.name,
        description: updateDto.description,
        sort: updateDto.sort,
        isActive: updateDto.isActive
      });

      // 4. 保存模型
      await this.modelRepository.save(model);

      // 5. 更新属性关联
      await this.modelAttributeRepository.delete({ modelId: id });
      const modelAttributes = updateDto.attributeIds.map(attributeId => ({
        modelId: id,
        attributeId
      }));
      await this.modelAttributeRepository
        .createQueryBuilder()
        .insert()
        .into('content_model_attributes')
        .values(modelAttributes)
        .execute();

      // 6. 更新属性值关联
      await this.modelAttributeValueRepository.delete({ modelId: id });
      const modelAttributeValues = updateDto.attributeValues.map(av => ({
        modelId: id,
        attributeId: av.attributeId,
        attributeValueId: av.attributeValueId,
        isEnabled: av.isEnabled ?? true,
        sort: av.sort ?? 0
      }));
      await this.modelAttributeValueRepository
        .createQueryBuilder()
        .insert()
        .into('content_model_attribute_values')
        .values(modelAttributeValues)
        .execute();

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

  async getModelAttributes(id: number): Promise<ContentModelAttribute[]> {
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

      // 2. 删除旧的关联
      await this.modelAttributeRepository.delete({ modelId: id });

      // 3. 创建新的关联
      const modelAttributes = attributeIds.map(attributeId => ({
        modelId: id,
        attributeId
      }));

      await this.modelAttributeRepository.save(modelAttributes);

      // 4. 重新加载模型
      const updatedModel = await this.findOne(id);
      this.logger.log(`更新内容模型属性成功: ${id}`);
      return updatedModel;
    } catch (error) {
      this.logger.error(`更新内容模型属性失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getModelAttributeValues(id: number): Promise<ContentModelAttributeValue[]> {
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
    attributeValues: { attributeId: number; attributeValueId: number; isEnabled?: boolean; sort?: number; }[]
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

      // 2. 删除旧的关联
      await this.modelAttributeValueRepository.delete({ modelId: id });

      // 3. 创建新的关联
      const modelAttributeValues = attributeValues.map(av => ({
        modelId: id,
        attributeId: av.attributeId,
        attributeValueId: av.attributeValueId,
        isEnabled: av.isEnabled ?? true,
        sort: av.sort ?? 0
      }));

      await this.modelAttributeValueRepository.save(modelAttributeValues);

      // 4. 重新加载模型
      const updatedModel = await this.findOne(id);
      this.logger.log(`更新内容模型属性值成功: ${id}`);
      return updatedModel;
    } catch (error) {
      this.logger.error(`更新内容模型属性值失败: ${error.message}`, error.stack);
      throw error;
    }
  }
} 