import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ContentCategory } from './content-category.entity';
import { ContentModelAttribute } from './content-model-attribute.entity';
import { ContentModelAttributeValue } from './content-model-attribute-value.entity';

@Entity('content_models')
export class ContentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => ContentCategory, category => category.model)
  categories: ContentCategory[];

  @OneToMany(() => ContentModelAttribute, modelAttribute => modelAttribute.model, { eager: true })
  attributes: ContentModelAttribute[];

  @OneToMany(() => ContentModelAttributeValue, attributeValue => attributeValue.model, { eager: true })
  attributeValues: ContentModelAttributeValue[];

  @Column({ type: 'int', default: 0 })
  sort: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
} 