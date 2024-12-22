import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateArticleCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  sort?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateArticleCategoryDto extends CreateArticleCategoryDto {} 