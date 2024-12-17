import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { ContentModel } from './content-model.entity';
import { ContentAttribute } from './content-attribute.entity';

@Entity('content_model_attributes')
export class ContentModelAttribute {
  @PrimaryColumn({ name: 'modelId' })
  modelId: number;

  @PrimaryColumn({ name: 'attributeId' })
  attributeId: number;

  @ManyToOne(() => ContentModel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'modelId' })
  model: ContentModel;

  @ManyToOne(() => ContentAttribute, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attributeId' })
  attribute: ContentAttribute;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 