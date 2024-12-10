import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { VipLevel } from './vip-level.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled'
}

@Entity('vip_orders')
export class VipOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNo: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => VipLevel)
  vipLevel: VipLevel;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus;

  @Column({ nullable: true })
  paymentMethod?: string;

  @Column({ nullable: true })
  paymentTime?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 