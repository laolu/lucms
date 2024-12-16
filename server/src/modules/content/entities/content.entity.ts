import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ContentCategory } from './content-category.entity';
import { ContentAttributeRelation } from './content-attribute-relation.entity';
import { ContentComment } from './content-comment.entity';

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ type: 'json', nullable: true })
  images?: string[];

  @Column({ nullable: true })
  coverImage?: string;

  @Column({ nullable: true })
  bannerImage?: string;

  @Column({ default: true })
  isActive: boolean = true;

  @Column({ default: 0 })
  sort: number = 0;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number = 0;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  originalPrice?: number;

  @Column({ default: false })
  isFree: boolean = false;

  @Column({ default: false })
  isVipFree: boolean = false;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  vipPrice?: number;

  @Column({ nullable: true })
  downloadUrl?: string;

  @Column({ nullable: true })
  downloadPassword?: string;

  @Column({ nullable: true })
  extractPassword?: string;

  @Column({ default: 0 })
  viewCount: number = 0;

  @Column({ default: 0 })
  commentCount: number = 0;

  @Column({ default: 0 })
  likeCount: number = 0;

  @Column({ default: 0 })
  favoriteCount: number = 0;

  @Column({ default: 0 })
  shareCount: number = 0;

  @Column({ type: 'json', nullable: true })
  tags?: string[];

  @Column({ type: 'json', nullable: true })
  meta?: Record<string, any>;

  @Column({ nullable: true })
  source?: string;

  @Column({ nullable: true })
  author?: string;

  @Column({ nullable: true })
  publishedAt?: Date;

  @Column()
  categoryId!: number;

  @ManyToOne(() => ContentCategory, category => category.contents)
  category!: ContentCategory;

  @OneToMany(() => ContentAttributeRelation, relation => relation.content, {
    cascade: true
  })
  attributeValues!: ContentAttributeRelation[];

  @OneToMany(() => ContentComment, comment => comment.content, {
    cascade: true
  })
  comments!: ContentComment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<Content>) {
    Object.assign(this, partial);
  }
} 