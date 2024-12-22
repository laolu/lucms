import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AttributeType } from '../entities/content-attribute.entity';
import { CreateAttributeValueDto } from './content-attribute-value.dto';

export class CreateContentAttributeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(AttributeType)
  type: AttributeType;

  @ValidateNested({ each: true })
  @Type(() => CreateAttributeValueDto)
  values: CreateAttributeValueDto[];

  @IsOptional()
  @IsNumber()
  sort?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 