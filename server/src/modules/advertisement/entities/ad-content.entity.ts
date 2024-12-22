import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Advertisement } from './advertisement.entity';

@Entity('advertisements_contents')
export class AdContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  link: string;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => Advertisement, ad => ad.contents, {
    onDelete: 'CASCADE'
  })
  advertisement: Advertisement;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
} 