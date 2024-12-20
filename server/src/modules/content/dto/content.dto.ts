import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsArray, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContentDto {
  @ApiProperty({ description: '标题', example: '示例内容' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: '描述', example: '这是一个示例内容的描述' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: '分类ID', example: 1 })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: '内容', example: '这是内容详情' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: '排序顺序', example: 1 })
  @IsOptional()
  @IsNumber()
  sort?: number;

  @ApiPropertyOptional({ description: '是否激活', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: '缩略图URL', example: 'http://example.com/thumbnail.jpg' })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiPropertyOptional({ description: '图片列表', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({ description: '封面图URL', example: 'http://example.com/cover.jpg' })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({ description: '横幅图URL', example: 'http://example.com/banner.jpg' })
  @IsOptional()
  @IsString()
  bannerImage?: string;

  @ApiPropertyOptional({ description: '价格', example: 99.99 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ description: '原价', example: 199.99 })
  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @ApiPropertyOptional({ description: '是否免费', example: false })
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @ApiPropertyOptional({ description: '是否VIP免费', example: false })
  @IsOptional()
  @IsBoolean()
  isVipFree?: boolean;

  @ApiPropertyOptional({ description: 'VIP价格', example: 49.99 })
  @IsOptional()
  @IsNumber()
  vipPrice?: number;

  @ApiPropertyOptional({ description: '下载链接', example: 'http://example.com/download' })
  @IsOptional()
  @IsString()
  downloadUrl?: string;

  @ApiPropertyOptional({ description: '下载密码', example: '123456' })
  @IsOptional()
  @IsString()
  downloadPassword?: string;

  @ApiPropertyOptional({ description: '解压密码', example: '123456' })
  @IsOptional()
  @IsString()
  extractPassword?: string;

  @ApiPropertyOptional({ description: '标签列表', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: '来源', example: '官方' })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ description: '作者', example: 'John Doe' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({ description: '发布时间', example: '2023-12-19T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @ApiPropertyOptional({ description: '属性值ID列表', type: [Number] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  attributeValueIds?: number[];
}

export class UpdateContentDto extends CreateContentDto {
  // 移除 id 字段的要求，因为它已经在 URL 中了
} 