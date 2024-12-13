import { IsString, IsEmail, IsOptional, IsBoolean, IsPhoneNumber, MinLength, IsDate, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: '用户名', example: 'johndoe', minLength: 3 })
  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;

  @ApiPropertyOptional({ description: '密码', example: '123456', minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ description: '邮箱', example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: '头像URL', example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({ description: '昵称', example: 'John Doe' })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiPropertyOptional({ description: '个人简介', example: '这是我的个人简介' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ description: '手机号', example: '13800138000' })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({ description: '是否为管理员', example: false })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @ApiPropertyOptional({ description: '是否激活', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: '验证码', example: '123456' })
  @IsOptional()
  @IsString()
  verificationCode?: string;

  @ApiPropertyOptional({ description: '验证码过期时间', example: '2023-12-31T23:59:59Z' })
  @IsOptional()
  @IsDate()
  verificationCodeExpiredAt?: Date;

  @ApiPropertyOptional({ description: '重置密码令牌', example: 'token123' })
  @IsOptional()
  @IsString()
  resetPasswordToken?: string;

  @ApiPropertyOptional({ description: '重置密码令牌过期时间', example: '2023-12-31T23:59:59Z' })
  @IsOptional()
  @IsDate()
  resetPasswordTokenExpiredAt?: Date;

  @ApiPropertyOptional({ description: '登录尝试次数', example: 0 })
  @IsOptional()
  @IsNumber()
  loginAttempts?: number;

  @ApiPropertyOptional({ description: '锁定截止时间', example: '2023-12-31T23:59:59Z' })
  @IsOptional()
  @IsDate()
  lockoutUntil?: Date;

  @ApiPropertyOptional({ description: '邮箱验证时间', example: '2023-12-31T23:59:59Z' })
  @IsOptional()
  @IsDate()
  emailVerifiedAt?: Date;

  @ApiPropertyOptional({ description: '手机验证时间', example: '2023-12-31T23:59:59Z' })
  @IsOptional()
  @IsDate()
  phoneVerifiedAt?: Date;

  @ApiPropertyOptional({ description: '最后登录时间', example: '2023-12-31T23:59:59Z' })
  @IsOptional()
  @IsDate()
  lastLoginAt?: Date;

  @ApiPropertyOptional({ description: '最后登录IP', example: '192.168.1.1' })
  @IsOptional()
  @IsString()
  lastLoginIp?: string;
} 