import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  sort?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  attributeValueIds: number[];
} 