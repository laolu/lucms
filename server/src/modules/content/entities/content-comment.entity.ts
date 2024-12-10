import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Content } from './content.entity';
import { User } from '../../users/entities/user.entity';

@Entity('content_comments')
export class ContentComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  commentContent: string;

  @ManyToOne(() => Content, content => content.comments)
  content: Content;

  @Column()
  contentId: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @Column({ default: 0 })
  parentId: number;

  @ManyToOne(() => ContentComment, comment => comment.children)
  parent: ContentComment;

  @OneToMany(() => ContentComment, comment => comment.parent)
  children: ContentComment[];

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 