import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  icon?: string;

  @Column({ nullable: true })
  path?: string;

  @Column({ default: true })
  visible: boolean = true;

  @Column({ default: 0 })
  sort: number = 0;

  @Column({ nullable: true })
  parentId?: number;

  @ManyToOne(() => Menu, menu => menu.children, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: Menu;

  @OneToMany(() => Menu, menu => menu.parent, { cascade: true })
  children: Menu[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<Menu>) {
    Object.assign(this, partial);
  }
} 