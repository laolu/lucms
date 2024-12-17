import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContentModelService } from './content-model.service';
import { ContentModel } from './entities/content-model.entity';
import { CreateContentModelDto, UpdateContentModelDto, ModelAttributeValueDto } from './dto/content-model.dto';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('内容模型')
@Controller('content-models')
@UseGuards(AdminGuard)
export class ContentModelController {
  constructor(private readonly modelService: ContentModelService) {}

  @Post()
  @ApiOperation({ summary: '创建内容模型' })
  @ApiResponse({ status: 201, description: '创建成功', type: ContentModel })
  async create(@Body() createDto: CreateContentModelDto): Promise<ContentModel> {
    return await this.modelService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有内容模型' })
  @ApiResponse({ status: 200, description: '获取成功', type: [ContentModel] })
  async findAll(): Promise<ContentModel[]> {
    return await this.modelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定内容模型' })
  @ApiResponse({ status: 200, description: '获取成功', type: ContentModel })
  async findOne(@Param('id') id: string): Promise<ContentModel> {
    return await this.modelService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新内容模型' })
  @ApiResponse({ status: 200, description: '更新成功', type: ContentModel })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateContentModelDto,
  ): Promise<ContentModel> {
    return await this.modelService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除内容模型' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.modelService.remove(+id);
  }

  @Get(':id/attributes')
  @ApiOperation({ summary: '获取内容模型的属性' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getModelAttributes(@Param('id') id: string) {
    return await this.modelService.getModelAttributes(+id);
  }

  @Put(':id/attributes')
  @ApiOperation({ summary: '更新内容模型的属性' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async updateModelAttributes(
    @Param('id') id: string,
    @Body('attributeIds') attributeIds: number[],
  ) {
    return await this.modelService.updateModelAttributes(+id, attributeIds);
  }

  @Get(':id/attribute-values')
  @ApiOperation({ summary: '获取内容模型的属性值' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getModelAttributeValues(@Param('id') id: string) {
    return await this.modelService.getModelAttributeValues(+id);
  }

  @Put(':id/attribute-values')
  @ApiOperation({ summary: '更新内容模型的属性值' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async updateModelAttributeValues(
    @Param('id') id: string,
    @Body() attributeValues: ModelAttributeValueDto[],
  ) {
    return await this.modelService.updateModelAttributeValues(+id, attributeValues);
  }
} 