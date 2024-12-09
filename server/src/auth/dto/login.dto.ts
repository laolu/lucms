import { IsEmail, IsPhoneNumber, IsString, MinLength, IsOptional, ValidateIf } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsPhoneNumber('CN')
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @ValidateIf(o => !o.phone && !o.email)
  @IsString()
  message = '必须提供手机号或邮箱地址';

  @IsString()
  @MinLength(6)
  password: string;
} 