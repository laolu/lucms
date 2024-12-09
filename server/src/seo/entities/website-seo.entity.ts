import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('website_seo')
export class WebsiteSeo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  siteName: string;

  @Column({ type: 'text', nullable: true })
  defaultDescription: string;

  @Column({ nullable: true })
  defaultKeywords: string;

  @Column({ nullable: true })
  defaultOgImage: string;

  @Column({ nullable: true })
  googleAnalyticsId: string;

  @Column({ type: 'text', nullable: true })
  robotsTxt: string;

  @Column({ type: 'text', nullable: true })
  sitemapXml: string;

  @Column({ type: 'json', nullable: true })
  customScripts: string[];

  @Column({ type: 'json', nullable: true })
  customMetaTags: { name: string; content: string }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<WebsiteSeo>) {
    Object.assign(this, partial);
  }
} 