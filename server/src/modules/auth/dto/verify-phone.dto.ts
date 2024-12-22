import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class VerifyPhoneDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  code: string;
} 