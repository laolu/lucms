import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ContentCategory } from './content-category.entity';
import { ContentAttribute } from './content-attribute.entity';
import { ContentAttributeValue } from './content-attribute-value.entity';

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

  @ManyToMany(() => ContentAttribute, { eager: true })
  @JoinTable({
    name: 'content_model_attributes',
    joinColumn: {
      name: 'modelId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'attributeId',
      referencedColumnName: 'id'
    }
  })
  attributes: ContentAttribute[];

  @ManyToMany(() => ContentAttributeValue, { eager: true })
  @JoinTable({
    name: 'content_model_attribute_values',
    joinColumn: {
      name: 'modelId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'attributeValueId',
      referencedColumnName: 'id'
    }
  })
  attributeValues: ContentAttributeValue[];

  @Column({ type: 'int', default: 0 })
  sort: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
} 