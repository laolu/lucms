import { IsNotEmpty, IsString, IsEnum, IsUrl, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AdPosition } from '../../../common/enums/ad-position.enum';

export class CreateAdvertisementDto {
  @ApiProperty({ description: '广告标题', example: '首页顶部广告' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: '广告图片URL', example: 'https://example.com/ad.jpg' })
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @ApiProperty({ description: '广告链接URL', example: 'https://example.com/product' })
  @IsNotEmpty()
  @IsUrl()
  linkUrl: string;

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
  startDate?: Date;

  @ApiPropertyOptional({ description: '结束时间', example: '2024-12-31T23:59:59Z' })
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional({ description: '排序顺序', example: 1 })
  @IsOptional()
  @IsNumber()
  order?: number;
} 