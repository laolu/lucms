import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { AdPosition } from '../../../common/enums/ad-position.enum';
import { AdContent } from './ad-content.entity';

@Entity('advertisements')
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: ['single', 'multiple', 'carousel'], default: 'single' })
  type: string;

  @Column({ type: 'enum', enum: AdPosition })
  position: AdPosition;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  startDate: string | null;

  @Column({ type: 'timestamp', nullable: true })
  endDate: string | null;

  @Column({ default: 0 })
  order: number;

  @OneToMany(() => AdContent, content => content.advertisement, {
    cascade: true,
    eager: true
  })
  contents: AdContent[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
} 