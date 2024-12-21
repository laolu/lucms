import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { ArticleCategory } from './entities/article-category.entity';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { CreateArticleCategoryDto, UpdateArticleCategoryDto } from './dto/article-category.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(ArticleCategory)
    private readonly categoryRepository: Repository<ArticleCategory>,
  ) {}

  // 文章分类相关方法
  async findAllCategories() {
    return this.categoryRepository.find({
      order: { sort: 'ASC' },
    });
  }

  async findCategoryById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['articles'],
    });
    if (!category) {
      throw new NotFoundException('分类不存在');
    }
    return category;
  }

  async createCategory(dto: CreateArticleCategoryDto) {
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  async updateCategory(id: number, dto: UpdateArticleCategoryDto) {
    const category = await this.findCategoryById(id);
    Object.assign(category, dto);
    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number) {
    const category = await this.findCategoryById(id);
    if (category.isSystem) {
      throw new Error('系统分类不能删除');
    }
    return this.categoryRepository.remove(category);
  }

  // 文章相关方法
  async findAllArticles() {
    return this.articleRepository.find({
      relations: ['category'],
      order: { sort: 'ASC', createdAt: 'DESC' },
    });
  }

  async findArticleById(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!article) {
      throw new NotFoundException('文章不存在');
    }
    return article;
  }

  async findArticlesByCategory(categoryId: number) {
    return this.articleRepository.find({
      where: { categoryId },
      relations: ['category'],
      order: { sort: 'ASC', createdAt: 'DESC' },
    });
  }

  async createArticle(dto: CreateArticleDto) {
    const category = await this.findCategoryById(dto.categoryId);
    const article = this.articleRepository.create(dto);
    return this.articleRepository.save(article);
  }

  async updateArticle(id: number, dto: UpdateArticleDto) {
    const article = await this.findArticleById(id);
    if (dto.categoryId) {
      await this.findCategoryById(dto.categoryId);
    }
    Object.assign(article, dto);
    return this.articleRepository.save(article);
  }

  async deleteArticle(id: number) {
    const article = await this.findArticleById(id);
    return this.articleRepository.remove(article);
  }

  async incrementViewCount(id: number) {
    const article = await this.findArticleById(id);
    article.viewCount += 1;
    return this.articleRepository.save(article);
  }
} 