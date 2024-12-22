import { IsNotEmpty, IsString, IsEnum, IsUrl, IsBoolean, IsOptional, IsNumber, IsArray, ValidateNested, IsIn } from 'class-validator';
import { AdPosition } from '../../../common/enums/ad-position.enum';
import { Type } from 'class-transformer';

export class CreateAdContentDto {
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}

export class CreateAdvertisementDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsIn(['single', 'multiple', 'carousel'])
  type: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAdContentDto)
  contents: CreateAdContentDto[];

  @IsNotEmpty()
  @IsEnum(AdPosition)
  position: AdPosition;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  startDate?: string;

  @IsOptional()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
} 