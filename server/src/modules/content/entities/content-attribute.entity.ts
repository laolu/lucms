import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ContentAttributeValue } from './content-attribute-value.entity';

export enum AttributeType {
  SINGLE = 'single',    // 单选
  MULTIPLE = 'multiple' // 多选
}

@Entity('content_attributes')
export class ContentAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: AttributeType,
    default: AttributeType.SINGLE
  })
  type: AttributeType;

  @OneToMany(() => ContentAttributeValue, value => value.attribute, {
    cascade: true
  })
  values: ContentAttributeValue[];

  @Column({ default: 0 })
  sort: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
} 