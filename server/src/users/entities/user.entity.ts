import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export enum UserRole {
  USER = 'user',
  MEMBER = 'member',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: true })
  @IsOptional()
  @IsPhoneNumber('CN')
  phone?: string;

  @Column({ unique: true, nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Column()
  @Exclude()
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole = UserRole.USER;

  @Column({ nullable: true })
  membershipExpiry: Date | null = null;

  @Column({ nullable: true })
  @Exclude()
  resetPasswordToken?: string;

  @Column({ nullable: true })
  @Exclude()
  resetPasswordExpires?: Date;

  @Column({ nullable: true })
  @Exclude()
  verificationCode?: string;

  @Column({ nullable: true })
  @Exclude()
  verificationCodeExpires?: Date;

  @Column({ default: false })
  isEmailVerified: boolean = false;

  @Column({ default: false })
  isPhoneVerified: boolean = false;

  @Column({ default: 0 })
  loginAttempts: number = 0;

  @Column({ nullable: true })
  lastLoginAttempt?: Date;

  @Column({ nullable: true })
  lockedUntil?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  isLocked(): boolean {
    if (!this.lockedUntil) {
      return false;
    }
    return new Date() < this.lockedUntil;
  }
} 