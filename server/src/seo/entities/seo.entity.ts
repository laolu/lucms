import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('seo')
export class Seo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  keywords: string;

  @Column({ nullable: true })
  ogTitle: string;

  @Column({ type: 'text', nullable: true })
  ogDescription: string;

  @Column({ nullable: true })
  ogImage: string;

  @Column({ nullable: true })
  canonicalUrl: string;

  @Column({ nullable: true })
  robotsTxt: string;

  @Column({ type: 'json', nullable: true })
  customMetaTags: { name: string; content: string }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Seo>) {
    Object.assign(this, partial);
  }
} 