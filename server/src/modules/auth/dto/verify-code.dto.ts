import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyCodeDto {
  @ApiProperty({ description: '验证码', example: '123456' })
  @IsNotEmpty()
  @IsString()
  code: string;
} 