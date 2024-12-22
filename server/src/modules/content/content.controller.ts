import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/content.dto';
import { Content } from './entities/content.entity';
import { PaginationDto } from '@/common/dto/pagination.dto';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
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
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createDto: CreateContentDto): Promise<Content> {
    return await this.contentService.create(createDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Content> {
    return await this.contentService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateDto: Partial<CreateContentDto>
  ): Promise<Content> {
    return await this.contentService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('id') id: number): Promise<void> {
    await this.contentService.delete(id);
  }

  @Post(':id/view')
  async incrementViewCount(@Param('id') id: number): Promise<void> {
    await this.contentService.incrementViewCount(id);
  }

  @Get(':id/attribute-values')
  async getAttributeValues(@Param('id') id: number) {
    return await this.contentService.getContentAttributeValues(id);
  }
} 