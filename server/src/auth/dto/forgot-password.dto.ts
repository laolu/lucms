import { IsEmail, IsPhoneNumber, IsOptional, ValidateIf } from 'class-validator';

export class ForgotPasswordDto {
  @IsOptional()
  @IsPhoneNumber('CN')
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @ValidateIf(o => !o.phone && !o.email)
  message = '必须提供手机号或邮箱地址';
} 