import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  categoryId: number;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @IsNumber()
  @IsOptional()
  sort?: number;
}

export class UpdateArticleDto extends CreateArticleDto {} 