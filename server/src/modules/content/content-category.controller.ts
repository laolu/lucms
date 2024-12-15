import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Patch, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { ContentCategoryService } from './content-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ContentCategory } from './entities/content-category.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('内容分类')
@Controller('content-categories')
export class ContentCategoryController {
  constructor(private readonly categoryService: ContentCategoryService) {}

  @Post()
  @ApiOperation({ summary: '创建分类' })
  @ApiResponse({ status: 201, description: '分类创建成功', type: ContentCategory })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createDto: CreateCategoryDto): Promise<ContentCategory> {
    return await this.categoryService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有分类' })
  @ApiResponse({ status: 200, description: '获取成功', type: [ContentCategory] })
  async findAll(): Promise<ContentCategory[]> {
    return await this.categoryService.findAll();
  }

  @Get('tree')
  @ApiOperation({ summary: '获取分类树' })
  @ApiResponse({ status: 200, description: '获取成功', type: [ContentCategory] })
  async getTree(): Promise<ContentCategory[]> {
    return await this.categoryService.getTree();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定分类' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiResponse({ status: 200, description: '获取成功', type: ContentCategory })
  async findOne(@Param('id') id: number): Promise<ContentCategory> {
    return await this.categoryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新分类' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiResponse({ status: 200, description: '更新成功', type: ContentCategory })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateDto: Partial<CreateCategoryDto>
  ): Promise<ContentCategory> {
    return await this.categoryService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除分类' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('id') id: number): Promise<void> {
    await this.categoryService.delete(id);
  }

  @Patch(':id/sort')
  @ApiOperation({ summary: '更新分类排序' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiResponse({ status: 200, description: '排序更新成功', type: ContentCategory })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async updateSort(
    @Param('id') id: number,
    @Body('targetSort') targetSort: number
  ): Promise<ContentCategory> {
    return await this.categoryService.updateSort(id, targetSort);
  }

  @Get(':id/attributes')
  @ApiOperation({ summary: '获取分类关联的属性' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getCategoryAttributes(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.categoryService.getCategoryAttributes(id);
  }

  @Put(':id/attributes')
  @ApiOperation({ summary: '更新分类关联的属性' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async updateCategoryAttributes(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: {
      attributes: Array<{
        attributeId: number;
        valueIds: number[];
      }>;
    }
  ) {
    return await this.categoryService.updateCategoryAttributes(id, data);
  }
} 