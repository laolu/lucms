import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContentModelService } from './content-model.service';
import { ContentModel } from './entities/content-model.entity';
import { CreateContentModelDto, UpdateContentModelDto, ModelAttributeValueDto } from './dto/content-model.dto';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('内容模型')
@Controller('content-models')
@UseGuards(AdminGuard)
export class ContentModelController {
  private readonly logger = new Logger(ContentModelController.name);

  constructor(private readonly modelService: ContentModelService) {}

  @Post()
  @ApiOperation({ summary: '创建内容模型' })
  @ApiResponse({ status: 201, description: '创建成功', type: ContentModel })
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
  @ApiOperation({ summary: '获取所有内容模型' })
  @ApiResponse({ status: 200, description: '获取成功', type: [ContentModel] })
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
  @ApiOperation({ summary: '获取指定内容模型' })
  @ApiResponse({ status: 200, description: '获取成功', type: ContentModel })
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
  @ApiOperation({ summary: '更新内容模型' })
  @ApiResponse({ status: 200, description: '更新成功', type: ContentModel })
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
  @ApiOperation({ summary: '删除内容模型' })
  @ApiResponse({ status: 200, description: '删除成功' })
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
  @ApiOperation({ summary: '获取内容模型的属性' })
  @ApiResponse({ status: 200, description: '获取成功' })
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
  @ApiOperation({ summary: '更新内容模型的属性' })
  @ApiResponse({ status: 200, description: '更新成功' })
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
  @ApiOperation({ summary: '获取内容模型的属性值' })
  @ApiResponse({ status: 200, description: '获取成功' })
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
  @ApiOperation({ summary: '获取内容模型的属性和属性值（包含排序和选中状态）' })
  @ApiResponse({ status: 200, description: '获取成功' })
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
  @ApiOperation({ summary: '更新内容模型的属性值' })
  @ApiResponse({ status: 200, description: '更新成功' })
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