import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentModel } from './entities/content-model.entity';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { ContentModelAttribute } from './entities/content-model-attribute.entity';
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
    private modelAttributeRepository: Repository<ContentModelAttribute>
  ) {}

  async create(createDto: CreateContentModelDto): Promise<ContentModel> {
    try {
      this.logger.log(`开始创建内容模型: ${JSON.stringify(createDto)}`);

      // 1. 验证属性是否存在
      const attributes = await this.attributeRepository.findByIds(createDto.attributeIds);
      if (attributes.length !== createDto.attributeIds.length) {
        throw new NotFoundException('部分属性不存在');
      }

      // 2. 创建模型
      const model = this.modelRepository.create({
        name: createDto.name,
        description: createDto.description,
        sort: createDto.sort ?? 0,
        isActive: createDto.isActive ?? true
      });

      // 3. 保存模型
      const savedModel = await this.modelRepository.save(model);

      // 4. 创建属性关联
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
      
      // 1. 查询所有模型基本信息
      const models = await this.modelRepository.query(`
        SELECT m.* FROM content_models m ORDER BY m.createdAt DESC
      `);

      // 2. 查询所有属性数据
      const attributes = await this.modelRepository.query(`
        SELECT 
          ma.modelId,
          av.id as "attributeId",
          av.name as "attributeName",
          av.type as "attributeType",
          ma.modelId as "modelId"
        FROM content_model_attributes ma
        LEFT JOIN content_attributes av ON ma.attributeId = av.id
      `);

      // 按模型ID分组属性数据
      const attributesByModel = new Map<number, Map<number, any>>();
      for (const row of attributes) {
        if (!attributesByModel.has(row.modelId)) {
          attributesByModel.set(row.modelId, new Map<number, any>());
        }
        const modelAttributes = attributesByModel.get(row.modelId);

        if (!modelAttributes.has(row.attributeId)) {
          modelAttributes.set(row.attributeId, {
            modelId: row.modelId,
            attributeId: row.attributeId,
            name: row.attributeName,
            type: row.attributeType,
            values: []
          });
        }
      }

      // 组合最终结果
      const result = models.map(model => ({
        ...model,
        attributes: Array.from(attributesByModel.get(model.id)?.values() || [])
      }));

      this.logger.log(`获取到 ${result.length} 个内容模型`);
      return result;
    } catch (error) {
      this.logger.error(`获取所有内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(id: number): Promise<ContentModel> {
    try {
      this.logger.log(`开始获取内容模型: ${id}`);
      
      // 1. 查询模型基本信息
      const [model] = await this.modelRepository.query(`
        SELECT m.* FROM content_models m WHERE m.id = ?
      `, [id]);

      if (!model) {
        throw new NotFoundException('内容模型不存在');
      }

      // 2. 查询属性数据
      const attributes = await this.modelRepository.query(`
        SELECT 
          a.id as "attributeId",
          a.name as "attributeName",
          a.type as "attributeType",
          av.id as "attributeValueId",
          av.value as "attributeValue",
          CASE 
            WHEN cmav.attributeValueId IS NOT NULL THEN 1 
            ELSE 0 
          END as "isChecked"
        FROM content_attributes a
        LEFT JOIN content_attribute_values av ON a.id = av.attributeId
        LEFT JOIN content_model_attribute_values cmav ON a.id = cmav.attributeId AND av.id = cmav.attributeValueId
        where cmav.modelId = ?
      `, [id]);

      // 转换属性数据
      const attributesMap = new Map<number, any>();
      for (const row of attributes) {
        if (!attributesMap.has(row.attributeId)) {
          attributesMap.set(row.attributeId, {
            attributeId: row.attributeId,
            name: row.attributeName,
            type: row.attributeType,
            values: []
          });
        }

        const attribute = attributesMap.get(row.attributeId);
        if (row.attributeValueId) {
          const existingValue = attribute.values.find(v => v.id === row.attributeValueId);
          if (!existingValue) {
            attribute.values.push({
              id: row.attributeValueId,
              value: row.attributeValue,
              isChecked: row.isChecked === 1
            });
          }
        }
      }

      // 组合最终结果
      const result = {
        ...model,
        attributes: Array.from(attributesMap.values())
      };

      this.logger.log(`获取内容模型成功: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`获取内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: number, updateDto: UpdateContentModelDto): Promise<ContentModel> {
    try {
      this.logger.log(`开始更新内容模型: ${id}, ${JSON.stringify(updateDto)}`);

      // 1. 验证模型是否存在
      const existingModel = await this.findOne(id);
      if (!existingModel) {
        throw new NotFoundException('内容模型不存在');
      }

      // 2. 验证属性是否存在
      if (updateDto.attributeIds) {
        const attributes = await this.attributeRepository.findByIds(updateDto.attributeIds);
        if (attributes.length !== updateDto.attributeIds.length) {
          throw new NotFoundException('部分属性不存在');
        }
      }

      // 3. 更新模型基本信息
      await this.modelRepository.update(id, {
        name: updateDto.name,
        description: updateDto.description,
        sort: updateDto.sort,
        isActive: updateDto.isActive
      });

      // 4. 如果提供了新的属性列表，更新属性关联
      if (updateDto.attributeIds) {
        // 删除现有的属性关联
        await this.modelAttributeRepository
          .createQueryBuilder()
          .delete()
          .where('modelId = :modelId', { modelId: id })
          .execute();

        // 创建新的属性关联
        if (updateDto.attributeIds.length > 0) {
          const modelAttributes = updateDto.attributeIds.map(attributeId => ({
            modelId: id,
            attributeId: attributeId
          }));

          await this.modelAttributeRepository
            .createQueryBuilder()
            .insert()
            .into('content_model_attributes')
            .values(modelAttributes)
            .execute();
        }
      }

      this.logger.log(`内容模型更新成功: ${id}`);
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
      
      if (!model) {
        throw new NotFoundException('内容模型不存在');
      }

      await this.modelRepository.remove(model);
      this.logger.log(`内容模型删除成功: ${id}`);
    } catch (error) {
      this.logger.error(`删除内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async updateStatus(id: number, isActive: boolean): Promise<ContentModel> {
    try {
      this.logger.log(`开始更新内容模型状态: ${id}, isActive: ${isActive}`);
      const model = await this.findOne(id);
      
      if (!model) {
        throw new NotFoundException('内容模型不存在');
      }

      model.isActive = isActive;
      const updatedModel = await this.modelRepository.save(model);
      this.logger.log(`内容模型状态更新成功: ${id}`);
      return updatedModel;
    } catch (error) {
      this.logger.error(`更新内容模型状态失败: ${error.message}`, error.stack);
      throw error;
    }
  }
} 