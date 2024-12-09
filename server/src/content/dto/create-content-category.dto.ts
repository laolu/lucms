import { IsString, IsOptional, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { SeoDto } from '../../seo/dto/seo.dto';

export class CreateContentCategoryDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  parentId?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  sort?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  attributeIds?: number[];

  @IsOptional()
  seo?: SeoDto;
} 