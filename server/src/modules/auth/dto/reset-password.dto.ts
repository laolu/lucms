import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ description: '重置密码令牌', example: 'token123' })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ description: '新密码', example: '123456', minLength: 6 })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;
} 