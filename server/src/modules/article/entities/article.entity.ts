import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ArticleCategory } from './article-category.entity';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => ArticleCategory, category => category.articles)
  @JoinColumn({ name: 'category_id' })
  category: ArticleCategory;

  @Column({ name: 'is_visible', default: true })
  isVisible: boolean;

  @Column({ name: 'view_count', default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  sort: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 