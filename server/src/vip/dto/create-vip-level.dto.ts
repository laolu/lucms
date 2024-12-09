import { IsString, IsNumber, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateVipLevelDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  duration: number;

  @IsArray()
  @IsString({ each: true })
  benefits: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  sort?: number;
} 