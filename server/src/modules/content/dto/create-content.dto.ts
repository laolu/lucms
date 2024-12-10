import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContentDto {
  @ApiProperty({ description: '内容标题', example: '这是一篇文章' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: '内容正文', example: '这是文章的详细内容...' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: '分类ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiPropertyOptional({ description: '是否激活', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: '排序顺序', example: 1 })
  @IsOptional()
  @IsNumber()
  sort?: number;

  @ApiProperty({ description: '属性值ID列表', example: [1, 2, 3], type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  attributeValueIds: number[];
} 