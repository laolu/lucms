import { IsNotEmpty, IsString, IsEnum, IsUrl, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { AdPosition } from '../../../common/enums/ad-position.enum';

export class CreateAdvertisementDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  @IsUrl()
  linkUrl: string;

  @IsNotEmpty()
  @IsEnum(AdPosition)
  position: AdPosition;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsOptional()
  @IsNumber()
  order?: number;
} 