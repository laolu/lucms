import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { ContentModelService } from './content-model.service';
import { ContentModel } from './entities/content-model.entity';
import { CreateContentModelDto, UpdateContentModelDto, ModelAttributeValueDto } from './dto/content-model.dto';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('content-models')
@UseGuards(AdminGuard)
export class ContentModelController {
  private readonly logger = new Logger(ContentModelController.name);

  constructor(private readonly modelService: ContentModelService) {}

  @Post()
  async create(@Body() createDto: CreateContentModelDto): Promise<ContentModel> {
    try {
      this.logger.log(`创建内容模型请求: ${JSON.stringify(createDto)}`);
      const result = await this.modelService.create(createDto);
      this.logger.log(`内容模型创建成功: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`创建内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<ContentModel[]> {
    try {
      this.logger.log('获取所有内容模型请求');
      const result = await this.modelService.findAll();
      this.logger.log(`获取到 ${result.length} 个内容模型`);
      return result;
    } catch (error) {
      this.logger.error(`获取所有内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ContentModel> {
    try {
      this.logger.log(`获取内容模型请求: ${id}`);
      const result = await this.modelService.findOne(+id);
      this.logger.log(`获取内容模型成功: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`获取内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateContentModelDto,
  ): Promise<ContentModel> {
    try {
      this.logger.log(`更新内容模型请求: ${id}, ${JSON.stringify(updateDto)}`);
      const result = await this.modelService.update(+id, updateDto);
      this.logger.log(`更新内容模型成功: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`更新内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      this.logger.log(`删除内容模型请求: ${id}`);
      await this.modelService.remove(+id);
      this.logger.log(`删除内容模型成功: ${id}`);
    } catch (error) {
      this.logger.error(`删除内容模型失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get(':id/attributes')
  async getModelAttributes(@Param('id') id: string) {
    try {
      this.logger.log(`获取内容模型属性请求: ${id}`);
      const result = await this.modelService.getModelAttributes(+id);
      this.logger.log(`获取内容模型属性成功: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`获取内容模型属性失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Put(':id/attributes')
  async updateModelAttributes(
    @Param('id') id: string,
    @Body('attributeIds') attributeIds: number[],
  ) {
    try {
      this.logger.log(`更新内容模型属性请求: ${id}, ${JSON.stringify(attributeIds)}`);
      const result = await this.modelService.updateModelAttributes(+id, attributeIds);
      this.logger.log(`更新内容模型属性成功: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`更新内容模型属性失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get(':id/attribute-values')
  async getModelAttributeValues(@Param('id') id: string) {
    try {
      this.logger.log(`获取内容模型属性值请求: ${id}`);
      const result = await this.modelService.getModelAttributeValues(+id);
      this.logger.log(`获取内容模型属性值成功: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`获取内容模型属性值失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get(':id/attributes-with-values')
  async getModelAttributesWithValues(@Param('id') id: string) {
    try {
      this.logger.log(`获取内容模型属性和属性值请求: ${id}`);
      const result = await this.modelService.getModelAttributesWithValues(+id);
      this.logger.log(`获取内容模型属性和属性值成功: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`获取内容模型属性和属性值失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Put(':id/attribute-values')
  async updateModelAttributeValues(
    @Param('id') id: string,
    @Body() attributeValues: ModelAttributeValueDto[],
  ) {
    try {
      this.logger.log(`更新内容模型属性值请求: ${id}, ${JSON.stringify(attributeValues)}`);
      const result = await this.modelService.updateModelAttributeValues(+id, attributeValues);
      this.logger.log(`更新内容模型属性值成功: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`更新内容模型属性值失败: ${error.message}`, error.stack);
      throw error;
    }
  }
} 