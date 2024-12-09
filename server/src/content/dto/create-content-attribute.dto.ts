import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateContentAttributeDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  sort?: number;
} 