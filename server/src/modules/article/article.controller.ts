import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { CreateArticleCategoryDto, UpdateArticleCategoryDto } from './dto/article-category.dto';

@ApiTags('文章管理')
@Controller('api/admin/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // 文章分类相关接口
  @Get('categories')
  @ApiOperation({ summary: '获取所有文章分类' })
  findAllCategories() {
    return this.articleService.findAllCategories();
  }

  @Get('categories/:id')
  @ApiOperation({ summary: '获取文章分类详情' })
  findCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findCategoryById(id);
  }

  @Post('categories')
  @ApiOperation({ summary: '创建文章分类' })
  createCategory(@Body() dto: CreateArticleCategoryDto) {
    return this.articleService.createCategory(dto);
  }

  @Put('categories/:id')
  @ApiOperation({ summary: '更新文章分类' })
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleCategoryDto,
  ) {
    return this.articleService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  @ApiOperation({ summary: '删除文章分类' })
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.deleteCategory(id);
  }

  // 文章相关接口
  @Get()
  @ApiOperation({ summary: '获取所有文章' })
  findAllArticles() {
    return this.articleService.findAllArticles();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取文章详情' })
  findArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findArticleById(id);
  }

  @Get('by-category/:categoryId')
  @ApiOperation({ summary: '获取分类下的所有文章' })
  findArticlesByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.articleService.findArticlesByCategory(categoryId);
  }

  @Post()
  @ApiOperation({ summary: '创建文章' })
  createArticle(@Body() dto: CreateArticleDto) {
    return this.articleService.createArticle(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新文章' })
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleDto,
  ) {
    return this.articleService.updateArticle(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.deleteArticle(id);
  }

  @Post(':id/increment-view')
  @ApiOperation({ summary: '增加文章浏览量' })
  incrementViewCount(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.incrementViewCount(id);
  }
} 