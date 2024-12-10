import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendSmsDto {
  @ApiProperty({ description: '手机号', example: '13800138000' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiPropertyOptional({ description: '短信类型', example: 'VERIFICATION', enum: ['VERIFICATION', 'PASSWORD_RESET'] })
  @IsOptional()
  @IsString()
  type?: string;
} 