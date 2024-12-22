import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator';

export class ModelAttributeValueDto {
  @IsNumber()
  attributeId: number;

  @IsNumber()
  attributeValueId: number;
}

export class CreateContentModelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  attributeIds: number[];

  @IsArray()
  attributeValues: ModelAttributeValueDto[];

  @IsOptional()
  @IsNumber()
  sort?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateContentModelDto extends CreateContentModelDto {
  // 移除 id 字段的要求，因为它已经在 URL 中了
} 