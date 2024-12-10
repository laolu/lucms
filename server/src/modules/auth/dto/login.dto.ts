import { IsNotEmpty, IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiPropertyOptional({ description: '邮箱', example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: '手机号', example: '13800138000' })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;
} 