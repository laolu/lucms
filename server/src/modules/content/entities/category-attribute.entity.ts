import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ContentCategory } from './content-category.entity';
import { ContentAttribute } from './content-attribute.entity';
import { CategoryAttributeValue } from './category-attribute-value.entity';

@Entity('category_attributes')
export class CategoryAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ContentCategory, category => category.attributes)
  category: ContentCategory;

  @Column()
  categoryId: number;

  @ManyToOne(() => ContentAttribute, attribute => attribute.categories)
  attribute: ContentAttribute;

  @Column()
  attributeId: number;

  @OneToMany(() => CategoryAttributeValue, categoryAttributeValue => categoryAttributeValue.categoryAttribute, {
    cascade: true
  })
  allowedValues: CategoryAttributeValue[];

  @Column({ default: true })
  isRequired: boolean;

  @Column({ default: 0 })
  sort: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 