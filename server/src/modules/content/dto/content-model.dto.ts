import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ModelAttributeValueDto {
  @ApiProperty({ description: '属性ID', example: 1 })
  @IsNumber()
  attributeId: number;

  @ApiProperty({ description: '属性值ID', example: 1 })
  @IsNumber()
  attributeValueId: number;
}

export class CreateContentModelDto {
  @ApiProperty({ description: '模型名称', example: '文章' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: '模型描述', example: '普通文章模型' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: '属性ID列表', type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  attributeIds: number[];

  @ApiProperty({ description: '属性值配置列表', type: [ModelAttributeValueDto] })
  @IsArray()
  attributeValues: ModelAttributeValueDto[];

  @ApiPropertyOptional({ description: '排序顺序', example: 1 })
  @IsOptional()
  @IsNumber()
  sort?: number;

  @ApiPropertyOptional({ description: '是否激活', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateContentModelDto extends CreateContentModelDto {
  // 移除 id 字段的要求，因为它已经在 URL 中了
} 