import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { CreateArticleCategoryDto, UpdateArticleCategoryDto } from './dto/article-category.dto';

@Controller('api/admin/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // 文章分类相关接口
  @Get('categories')
  findAllCategories() {
    return this.articleService.findAllCategories();
  }

  @Get('categories/:id')
  findCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findCategoryById(id);
  }

  @Post('categories')
  createCategory(@Body() dto: CreateArticleCategoryDto) {
    return this.articleService.createCategory(dto);
  }

  @Put('categories/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleCategoryDto,
  ) {
    return this.articleService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.deleteCategory(id);
  }

  // 文章相关接口
  @Get()
  findAllArticles() {
    return this.articleService.findAllArticles();
  }

  @Get(':id')
  findArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findArticleById(id);
  }

  @Get('by-category/:categoryId')
  findArticlesByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.articleService.findArticlesByCategory(categoryId);
  }

  @Post()
  createArticle(@Body() dto: CreateArticleDto) {
    return this.articleService.createArticle(dto);
  }

  @Put(':id')
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleDto,
  ) {
    return this.articleService.updateArticle(id, dto);
  }

  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.deleteArticle(id);
  }

  @Post(':id/increment-view')
  incrementViewCount(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.incrementViewCount(id);
  }
} 