import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ContentCommentService } from './content-comment.service';
import { CreateContentCommentDto } from './dto/create-content-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContentComment } from './entities/content-comment.entity';

@Controller('content-comments')
export class ContentCommentController {
  constructor(private readonly commentService: ContentCommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createDto: CreateContentCommentDto, @Request() req): Promise<ContentComment> {
    return this.commentService.create(createDto, req.user);
  }

  @Get('content/:contentId')
  async findByContent(@Param('contentId', ParseIntPipe) contentId: number): Promise<ContentComment[]> {
    return this.commentService.findByContent(contentId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<void> {
    return this.commentService.delete(id, req.user);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  async like(@Param('id', ParseIntPipe) id: number): Promise<ContentComment> {
    return this.commentService.like(id);
  }
} 