import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('sms_logs')
export class SmsLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  code: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ type: 'datetime', nullable: true })
  usedAt: Date;

  @Column({ default: 0 })
  retryCount: number;

  @Column({ type: 'datetime', nullable: true })
  lastRetryAt: Date;

  @Column({ default: true })
  isSuccess: boolean;

  @Column({ type: 'text', nullable: true })
  response: string;

  @Column({ type: 'text', nullable: true })
  error: string;

  @Column({ type: 'varchar', length: 50, default: 'VERIFICATION' })
  type: string;

  @Column({ type: 'datetime' })
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;
} 