import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Content } from './content.entity';

@Entity('content_comments')
export class ContentComment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  commentContent!: string;

  @ManyToOne(() => Content, content => content.comments)
  @JoinColumn()
  content!: Content;

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column({ nullable: true })
  parentId: number | null = null;

  @ManyToOne(() => ContentComment, comment => comment.children)
  @JoinColumn({ name: 'parentId' })
  parent: ContentComment | null = null;

  @OneToMany(() => ContentComment, comment => comment.parent)
  children!: ContentComment[];

  @Column({ default: 0 })
  likes: number = 0;

  @Column({ default: true })
  isActive: boolean = true;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<ContentComment>) {
    Object.assign(this, partial);
  }
} 