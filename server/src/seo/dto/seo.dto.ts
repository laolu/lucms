import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MetaTagDto {
  @IsString()
  name: string;

  @IsString()
  content: string;
}

export class SeoDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  keywords?: string;

  @IsString()
  @IsOptional()
  ogTitle?: string;

  @IsString()
  @IsOptional()
  ogDescription?: string;

  @IsString()
  @IsOptional()
  ogImage?: string;

  @IsString()
  @IsOptional()
  canonicalUrl?: string;

  @IsString()
  @IsOptional()
  robotsTxt?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MetaTagDto)
  customMetaTags?: MetaTagDto[];
} 