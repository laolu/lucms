import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Content } from './content.entity';
import { ContentAttributeValue } from './content-attribute-value.entity';

@Entity('content_attribute_relations')
export class ContentAttributeRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, content => content.attributeValues)
  content: Content;

  @ManyToOne(() => ContentAttributeValue, attributeValue => attributeValue.contents)
  attributeValue: ContentAttributeValue;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 