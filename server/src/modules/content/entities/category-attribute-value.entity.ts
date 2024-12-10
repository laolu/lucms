import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CategoryAttribute } from './category-attribute.entity';
import { ContentAttributeValue } from './content-attribute-value.entity';

@Entity('category_attribute_values')
export class CategoryAttributeValue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CategoryAttribute, categoryAttribute => categoryAttribute.allowedValues)
  categoryAttribute: CategoryAttribute;

  @Column()
  categoryAttributeId: number;

  @ManyToOne(() => ContentAttributeValue, attributeValue => attributeValue.categoryAttributes)
  attributeValue: ContentAttributeValue;

  @Column()
  attributeValueId: number;

  @Column({ default: true })
  isEnabled: boolean;

  @Column({ default: 0 })
  sort: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 