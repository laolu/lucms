import { IsString, IsEnum, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ContentType, ContentCategory } from '../entities/content.entity';
import { SeoDto } from '../../seo/dto/seo.dto';

export class CreateContentDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(ContentType)
  type: ContentType;

  @IsEnum(ContentCategory)
  category: ContentCategory;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  discountPrice?: number;

  @IsString()
  filePath: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  attributeIds?: number[];

  @IsOptional()
  seo?: SeoDto;
} 