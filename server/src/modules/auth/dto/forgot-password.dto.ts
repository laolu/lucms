import { IsNotEmpty, IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class ForgotPasswordDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
} 