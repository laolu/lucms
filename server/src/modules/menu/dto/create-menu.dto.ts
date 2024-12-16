import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;

  @IsOptional()
  @IsBoolean()
  adminOnly?: boolean;

  @IsOptional()
  @IsNumber()
  sort?: number;

  @IsOptional()
  @IsNumber()
  parentId?: number;
} 