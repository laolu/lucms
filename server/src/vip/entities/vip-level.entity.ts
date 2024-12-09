import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('vip_levels')
export class VipLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  duration: number; // 会员时长(天)

  @Column('simple-array')
  benefits: string[]; // 会员权益列表

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  sort: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 