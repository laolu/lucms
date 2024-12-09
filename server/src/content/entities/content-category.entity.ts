import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { Content } from './content.entity';
import { ContentAttribute } from './content-attribute.entity';
import { Seo } from '../../seo/entities/seo.entity';

@Entity('content_categories')
export class ContentCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description: string | null = null;

  @Column({ nullable: true, name: 'parent_id' })
  parentId: number | null = null;

  @ManyToOne(() => ContentCategory, category => category.children)
  parent: ContentCategory | null = null;

  @OneToMany(() => ContentCategory, category => category.parent)
  children!: ContentCategory[];

  @OneToMany(() => Content, content => content.category)
  contents!: Content[];

  @ManyToMany(() => ContentAttribute)
  @JoinTable({
    name: 'content_category_attributes',
    joinColumn: { name: 'category_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'attribute_id', referencedColumnName: 'id' }
  })
  attributes!: ContentAttribute[];

  @Column({ default: true })
  isActive: boolean = true;

  @Column({ default: 0 })
  sort: number = 0;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => Seo, { cascade: true, eager: true })
  @JoinColumn()
  seo!: Seo;

  constructor(partial: Partial<ContentCategory>) {
    Object.assign(this, partial);
  }
} 