import { IsNotEmpty, IsString, IsEnum, IsUrl, IsBoolean, IsOptional, IsNumber, IsArray, ValidateNested, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AdPosition } from '../../../common/enums/ad-position.enum';
import { Type } from 'class-transformer';

export class CreateAdContentDto {
  @ApiProperty({ description: '图片URL', example: 'https://example.com/ad.jpg' })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiPropertyOptional({ description: '标题', example: '广告标题' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: '描述', example: '广告描述' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: '链接', example: 'https://example.com/product' })
  @IsOptional()
  @IsUrl()
  link?: string;

  @ApiPropertyOptional({ description: '排序', example: 0 })
  @IsOptional()
  @IsNumber()
  order?: number;
}

export class CreateAdvertisementDto {
  @ApiProperty({ description: '广告标题', example: '首页顶部广告' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: '广告类型', example: 'single', enum: ['single', 'multiple', 'carousel'] })
  @IsNotEmpty()
  @IsIn(['single', 'multiple', 'carousel'])
  type: string;

  @ApiProperty({ description: '广告内容列表', type: [CreateAdContentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAdContentDto)
  contents: CreateAdContentDto[];

  @ApiProperty({ description: '广告位置', enum: AdPosition, example: AdPosition.HOME_BANNER })
  @IsNotEmpty()
  @IsEnum(AdPosition)
  position: AdPosition;

  @ApiPropertyOptional({ description: '是否激活', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: '开始时间', example: '2023-12-31T00:00:00Z' })
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ description: '结束时间', example: '2024-12-31T23:59:59Z' })
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ description: '排序顺序', example: 1 })
  @IsOptional()
  @IsNumber()
  order?: number;
} 