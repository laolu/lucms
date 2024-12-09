import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateContentCommentDto {
  @IsString()
  content: string;

  @IsNumber()
  contentId: number;

  @IsNumber()
  @IsOptional()
  parentId?: number;
} 