import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Content } from '../../content/entities/content.entity';
import { VipLevel } from '../../vip/entities/vip-level.entity';

export enum OrderType {
  CONTENT = 'content',  // 内容购买
  VIP = 'vip',         // VIP购买
}

export enum OrderStatus {
  PENDING = 'pending',     // 待支付
  PAID = 'paid',          // 已支付
  CANCELLED = 'cancelled', // 已取消
  REFUNDED = 'refunded',  // 已退款
  EXPIRED = 'expired',    // 已过期
}

export enum PaymentMethod {
  ALIPAY = 'alipay',    // 支付宝
  WECHAT = 'wechat',    // 微信支付
  BALANCE = 'balance',  // 余额支付
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderNo!: string;  // 订单号

  @Column({
    type: 'enum',
    enum: OrderType,
  })
  type!: OrderType;  // 订单类型

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status!: OrderStatus;  // 订单状态

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  amount!: number;  // 订单金额

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true
  })
  originalAmount?: number;  // 原价

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
  })
  discountAmount: number = 0;  // 优惠金额

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true
  })
  paymentMethod?: PaymentMethod;  // 支付方式

  @Column({ nullable: true })
  paymentTime?: Date;  // 支付时间

  @Column({ nullable: true })
  paymentNo?: string;  // 支付流水号

  @Column()
  userId!: number;  // 用户ID

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;  // 用户信息

  @Column({ nullable: true })
  contentId?: number;  // 内容ID（购买内容时）

  @ManyToOne(() => Content, { nullable: true })
  @JoinColumn({ name: 'contentId' })
  content?: Content;  // 内容信息

  @Column({ nullable: true })
  vipLevelId?: number;  // VIP等级ID（购买VIP时）

  @ManyToOne(() => VipLevel, { nullable: true })
  @JoinColumn({ name: 'vipLevelId' })
  vipLevel?: VipLevel;  // VIP等级信息

  @Column({ nullable: true })
  expireTime?: Date;  // 过期时间（VIP订单）

  @Column({ type: 'json', nullable: true })
  meta?: Record<string, any>;  // 额外信息

  @Column({ nullable: true })
  remark?: string;  // 备注

  @Column({ nullable: true })
  cancelTime?: Date;  // 取消时间

  @Column({ nullable: true })
  cancelReason?: string;  // 取消原因

  @Column({ nullable: true })
  refundTime?: Date;  // 退款时间

  @Column({ nullable: true })
  refundAmount?: number;  // 退款金额

  @Column({ nullable: true })
  refundReason?: string;  // 退款原因

  @CreateDateColumn()
  createdAt!: Date;  // 创建时间

  @UpdateDateColumn()
  updatedAt!: Date;  // 更新时间

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
} 