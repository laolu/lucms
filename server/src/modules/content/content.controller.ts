import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './entities/content.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('内容')
@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  @ApiOperation({ summary: '获取内容列表' })
  @ApiResponse({ status: 200, description: '获取成功', type: [Content] })
  async findAll(
    @Query() query: PaginationDto & {
      search?: string;
      categoryId?: string;
      isActive?: string;
      sortBy?: string;
      sort?: 'ASC' | 'DESC';
    }
  ) {
    const { 
      page = 1, 
      pageSize = 10,
      search,
      categoryId,
      isActive,
      sortBy = 'createdAt',
      sort = 'DESC'
    } = query;

    return await this.contentService.findAll({
      page: Number(page),
      pageSize: Number(pageSize),
      search,
      categoryId: categoryId ? Number(categoryId) : undefined,
      isActive: isActive ? isActive === 'true' : undefined,
      sortBy,
      sort
    });
  }

  @Post()
  @ApiOperation({ summary: '创建内容' })
  @ApiResponse({ status: 201, description: '内容创建成功', type: Content })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createDto: CreateContentDto): Promise<Content> {
    return await this.contentService.create(createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定内容' })
  @ApiParam({ name: 'id', description: '内容ID' })
  @ApiResponse({ status: 200, description: '获取成功', type: Content })
  async findOne(@Param('id') id: number): Promise<Content> {
    return await this.contentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新内容' })
  @ApiParam({ name: 'id', description: '内容ID' })
  @ApiResponse({ status: 200, description: '更新成功', type: Content })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateDto: Partial<CreateContentDto>
  ): Promise<Content> {
    return await this.contentService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除内容' })
  @ApiParam({ name: 'id', description: '内容ID' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('id') id: number): Promise<void> {
    await this.contentService.delete(id);
  }

  @Post(':id/view')
  @ApiOperation({ summary: '增加内容浏览量' })
  @ApiParam({ name: 'id', description: '内容ID' })
  @ApiResponse({ status: 200, description: '浏览量增加成功' })
  async incrementViewCount(@Param('id') id: number): Promise<void> {
    await this.contentService.incrementViewCount(id);
  }
} 