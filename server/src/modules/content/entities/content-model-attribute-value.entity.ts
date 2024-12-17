import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { ContentModel } from './content-model.entity';
import { ContentAttribute } from './content-attribute.entity';
import { ContentAttributeValue } from './content-attribute-value.entity';

@Entity('content_model_attribute_values')
export class ContentModelAttributeValue {
  @PrimaryColumn({ name: 'modelId' })
  modelId: number;

  @PrimaryColumn({ name: 'attributeId' })
  attributeId: number;

  @PrimaryColumn({ name: 'attributeValueId' })
  attributeValueId: number;

  @ManyToOne(() => ContentModel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'modelId' })
  model: ContentModel;

  @ManyToOne(() => ContentAttribute, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attributeId' })
  attribute: ContentAttribute;

  @ManyToOne(() => ContentAttributeValue, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attributeValueId' })
  attributeValue: ContentAttributeValue;

  @Column({ type: 'boolean', default: true })
  isEnabled: boolean;

  @Column({ type: 'int', default: 0 })
  sort: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 