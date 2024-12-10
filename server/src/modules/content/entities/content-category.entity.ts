import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Content } from './content.entity';
import { CategoryAttribute } from './category-attribute.entity';

@Entity('content_categories')
export class ContentCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  parentId: number;

  @ManyToOne(() => ContentCategory, category => category.children)
  parent: ContentCategory;

  @OneToMany(() => ContentCategory, category => category.parent)
  children: ContentCategory[];

  @OneToMany(() => Content, content => content.category)
  contents: Content[];

  @OneToMany(() => CategoryAttribute, categoryAttribute => categoryAttribute.category)
  attributes: CategoryAttribute[];

  @Column({ default: 0 })
  sort: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 