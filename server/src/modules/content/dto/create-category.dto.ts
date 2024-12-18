import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  parentId?: number;

  @IsNumber()
  @IsOptional()
  modelId?: number;

  @IsNumber()
  @IsOptional()
  sort?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 