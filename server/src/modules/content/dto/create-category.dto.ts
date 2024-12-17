import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: '分类名称', example: '新闻' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: '分类描述', example: '新闻分类' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: '父级分类ID', example: 1 })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @ApiPropertyOptional({ description: '内容模型ID', example: 1 })
  @IsOptional()
  @IsNumber()
  modelId?: number;

  @ApiPropertyOptional({ description: '排序顺序', example: 1 })
  @IsOptional()
  @IsNumber()
  sort?: number;

  @ApiPropertyOptional({ description: '是否激活', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 