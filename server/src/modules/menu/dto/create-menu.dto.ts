import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  path?: string;

  @IsBoolean()
  @IsOptional()
  visible?: boolean;

  @IsNumber()
  @IsOptional()
  sort?: number;

  @IsNumber()
  @IsOptional()
  parentId?: number;
} 