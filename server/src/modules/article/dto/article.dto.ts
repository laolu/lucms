import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ description: '文章标题' })
  @IsString()
  title: string;

  @ApiProperty({ description: '文章内容' })
  @IsString()
  content: string;

  @ApiProperty({ description: '分类ID' })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: '是否可见', required: false })
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @ApiProperty({ description: '排序', required: false })
  @IsNumber()
  @IsOptional()
  sort?: number;
}

export class UpdateArticleDto extends CreateArticleDto {} 