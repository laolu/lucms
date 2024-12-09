import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ContentAttribute } from './content-attribute.entity';
import { ContentCategory } from './content-category.entity';
import { Seo } from '../../seo/entities/seo.entity';
import { ContentComment } from './content-comment.entity';

export enum ContentType {
  FREE = 'free',
  PAID = 'paid',
  MEMBER = 'member',
}

export enum ContentFormat {
  DOCUMENT = 'document',
  VIDEO = 'video',
}

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column({
    type: 'enum',
    enum: ContentType,
    default: ContentType.FREE,
  })
  type: ContentType = ContentType.FREE;

  @Column({
    type: 'enum',
    enum: ContentFormat,
    default: ContentFormat.DOCUMENT,
  })
  format: ContentFormat = ContentFormat.DOCUMENT;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number | null = null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountPrice: number | null = null;

  @Column()
  filePath!: string;

  @Column({ default: 0 })
  downloads: number = 0;

  @Column({ default: 0 })
  views: number = 0;

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => ContentCategory, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category!: ContentCategory;

  @ManyToMany(() => ContentAttribute, attribute => attribute.contents)
  @JoinTable({
    name: 'content_attribute_relations',
    joinColumn: { name: 'content_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'attribute_id', referencedColumnName: 'id' }
  })
  attributes: ContentAttribute[];

  @OneToOne(() => Seo, { cascade: true, eager: true })
  @JoinColumn()
  seo: Seo;

  @OneToMany(() => ContentComment, comment => comment.content)
  comments: ContentComment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<Content>) {
    Object.assign(this, partial);
  }
} 