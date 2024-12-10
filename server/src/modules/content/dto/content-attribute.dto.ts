import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttributeType } from '../entities/content-attribute.entity';
import { CreateAttributeValueDto } from './content-attribute-value.dto';

export class CreateContentAttributeDto {
  @ApiProperty({ description: '属性名称', example: '颜色' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: '属性类型', enum: AttributeType, example: AttributeType.SINGLE })
  @IsNotEmpty()
  @IsEnum(AttributeType)
  type: AttributeType;

  @ApiProperty({ description: '属性值列表', type: [CreateAttributeValueDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateAttributeValueDto)
  values: CreateAttributeValueDto[];

  @ApiPropertyOptional({ description: '排序顺序', example: 1 })
  @IsOptional()
  @IsNumber()
  sort?: number;

  @ApiPropertyOptional({ description: '是否激活', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 