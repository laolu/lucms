import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { ContentAttributeRelation } from './content-attribute-relation.entity';
import { ContentCategory } from './content-category.entity';
import { ContentComment } from './content-comment.entity';

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => ContentCategory, category => category.contents)
  category: ContentCategory;

  @Column()
  categoryId: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ContentAttributeRelation, relation => relation.content, {
    cascade: true
  })
  attributeValues: ContentAttributeRelation[];

  @OneToMany(() => ContentComment, comment => comment.content, {
    cascade: true
  })
  comments: ContentComment[];

  @Column({ default: 0 })
  sort: number;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  commentCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 