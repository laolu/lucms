import { IsObject, IsNotEmpty, ValidateNested, IsNumber, IsBoolean, IsString, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class EmailConfigDto {
  @IsString()
  @IsNotEmpty()
  host: string;

  @IsNumber()
  @Min(1)
  @Max(65535)
  port: number;

  @IsBoolean()
  secure: boolean;

  @IsObject()
  @ValidateNested()
  @Type(() => EmailAuthDto)
  auth: EmailAuthDto;

  @IsString()
  @IsNotEmpty()
  from: string;
}

class EmailAuthDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  pass: string;
}

class SmsConfigDto {
  @IsEnum(['aliyun', 'tencent'])
  provider: 'aliyun' | 'tencent';

  @IsString()
  @IsNotEmpty()
  accessKeyId: string;

  @IsString()
  @IsNotEmpty()
  accessKeySecret: string;

  @IsString()
  @IsNotEmpty()
  signName: string;

  @IsString()
  @IsNotEmpty()
  templateCode: string;
}

class SecurityConfigDto {
  @IsNumber()
  @Min(6)
  passwordMinLength: number;

  @IsBoolean()
  passwordRequireNumbers: boolean;

  @IsBoolean()
  passwordRequireUppercase: boolean;

  @IsBoolean()
  passwordRequireSpecialChars: boolean;

  @IsNumber()
  @Min(1)
  maxLoginAttempts: number;

  @IsNumber()
  @Min(1)
  loginLockDuration: number;

  @IsNumber()
  @Min(1)
  maxVerificationAttempts: number;

  @IsNumber()
  @Min(1)
  verificationCodeExpiry: number;

  @IsNumber()
  @Min(1)
  resetPasswordTokenExpiry: number;
}

export class UpdateSystemConfigDto {
  @IsObject()
  @ValidateNested()
  @Type(() => EmailConfigDto)
  emailConfig: EmailConfigDto;

  @IsObject()
  @ValidateNested()
  @Type(() => SmsConfigDto)
  smsConfig: SmsConfigDto;

  @IsObject()
  @ValidateNested()
  @Type(() => SecurityConfigDto)
  securityConfig: SecurityConfigDto;
} 