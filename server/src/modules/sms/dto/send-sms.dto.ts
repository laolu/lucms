import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional } from 'class-validator';

export class SendSmsDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsString()
  type?: string;
} 