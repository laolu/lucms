import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConfigDto {
  @ApiProperty({ description: '配置键', example: 'SITE_NAME' })
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty({ description: '配置值', example: 'My Website' })
  @IsNotEmpty()
  value: any;

  @ApiPropertyOptional({ description: '值类型', example: 'string', enum: ['string', 'number', 'boolean', 'json'] })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: '配置描述', example: '网站名称' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: '是否激活', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 