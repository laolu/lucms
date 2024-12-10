import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: '评论内容', example: '这是一条评论' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: '内容ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;

  @ApiPropertyOptional({ description: '父评论ID', example: 1 })
  @IsOptional()
  @IsNumber()
  parentId?: number;
} 