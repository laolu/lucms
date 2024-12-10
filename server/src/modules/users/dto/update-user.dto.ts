import { IsOptional, IsString, IsEmail, IsBoolean, IsPhoneNumber, IsEnum, IsNumber, IsDate } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  verificationCode?: string;

  @IsOptional()
  @IsDate()
  verificationCodeExpiredAt?: Date;

  @IsOptional()
  @IsString()
  resetPasswordToken?: string;

  @IsOptional()
  @IsDate()
  resetPasswordTokenExpiredAt?: Date;

  @IsOptional()
  @IsNumber()
  loginAttempts?: number;

  @IsOptional()
  @IsDate()
  lockoutUntil?: Date;

  @IsOptional()
  @IsDate()
  emailVerifiedAt?: Date;

  @IsOptional()
  @IsDate()
  phoneVerifiedAt?: Date;

  @IsOptional()
  @IsDate()
  lastLoginAt?: Date;

  @IsOptional()
  @IsString()
  lastLoginIp?: string;
} 