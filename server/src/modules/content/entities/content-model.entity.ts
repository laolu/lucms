import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ContentCategory } from './content-category.entity';
import { ContentAttribute } from './content-attribute.entity';
import { ContentAttributeValue } from './content-attribute-value.entity';

@Entity('content_models')
export class ContentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => ContentCategory, category => category.model)
  categories: ContentCategory[];

  @ManyToMany(() => ContentAttribute)
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

  @ManyToMany(() => ContentAttributeValue)
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

  @Column({ default: 0 })
  sort: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 