import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Patch, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { ContentCategoryService } from './content-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ContentCategory } from './entities/content-category.entity';

@Controller('content-categories')
export class ContentCategoryController {
  constructor(private readonly categoryService: ContentCategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createDto: CreateCategoryDto): Promise<ContentCategory> {
    return await this.categoryService.create(createDto);
  }

  @Get()
  async findAll(): Promise<ContentCategory[]> {
    return await this.categoryService.findAll();
  }

  @Get('tree')
  async getTree(): Promise<ContentCategory[]> {
    return await this.categoryService.getTree();
  }

  @Get('content-tree')
  async getContentTree(): Promise<ContentCategory[]> {
    return await this.categoryService.getContentTree();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ContentCategory> {
    return await this.categoryService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateDto: Partial<CreateCategoryDto>
  ): Promise<ContentCategory> {
    return await this.categoryService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async remove(@Param('id') id: number): Promise<void> {
    await this.categoryService.remove(id);
  }

  @Patch(':id/sort')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async updateSort(
    @Param('id') id: number,
    @Body('targetSort') targetSort: number
  ): Promise<ContentCategory> {
    return await this.categoryService.updateSort(id, targetSort);
  }
} 