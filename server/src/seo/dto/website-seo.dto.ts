import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MetaTagDto {
  @IsString()
  name: string;

  @IsString()
  content: string;
}

export class WebsiteSeoDto {
  @IsString()
  siteName: string;

  @IsString()
  @IsOptional()
  defaultDescription?: string;

  @IsString()
  @IsOptional()
  defaultKeywords?: string;

  @IsString()
  @IsOptional()
  defaultOgImage?: string;

  @IsString()
  @IsOptional()
  googleAnalyticsId?: string;

  @IsString()
  @IsOptional()
  robotsTxt?: string;

  @IsString()
  @IsOptional()
  sitemapXml?: string;

  @IsArray()
  @IsOptional()
  customScripts?: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MetaTagDto)
  customMetaTags?: MetaTagDto[];
} 