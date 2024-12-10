import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContentCommentService } from './content-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ContentComment } from './entities/content-comment.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('评论')
@Controller('content-comments')
export class ContentCommentController {
  constructor(private readonly commentService: ContentCommentService) {}

  @Post()
  @ApiOperation({ summary: '创建评论' })
  @ApiResponse({ status: 201, description: '评论创建成功', type: ContentComment })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createDto: CreateCommentDto,
    @Request() req
  ): Promise<ContentComment> {
    return await this.commentService.create(createDto, req.user);
  }

  @Get('content/:contentId')
  @ApiOperation({ summary: '获取内容的所有评论' })
  @ApiParam({ name: 'contentId', description: '内容ID' })
  @ApiResponse({ status: 200, description: '获取成功', type: [ContentComment] })
  async findAll(@Param('contentId') contentId: number): Promise<ContentComment[]> {
    return await this.commentService.findAll(contentId);
  }

  @Get('content/:contentId/tree')
  @ApiOperation({ summary: '获取内容的评论树' })
  @ApiParam({ name: 'contentId', description: '内容ID' })
  @ApiResponse({ status: 200, description: '获取成功', type: [ContentComment] })
  async getCommentTree(@Param('contentId') contentId: number): Promise<ContentComment[]> {
    return await this.commentService.getCommentTree(contentId);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定评论' })
  @ApiParam({ name: 'id', description: '评论ID' })
  @ApiResponse({ status: 200, description: '获取成功', type: ContentComment })
  async findOne(@Param('id') id: number): Promise<ContentComment> {
    return await this.commentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新评论' })
  @ApiParam({ name: 'id', description: '评论ID' })
  @ApiBody({ schema: { type: 'object', properties: { content: { type: 'string', description: '评论内容', example: '更新后的评论内容' } } } })
  @ApiResponse({ status: 200, description: '更新成功', type: ContentComment })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: number,
    @Body('content') content: string,
    @Request() req
  ): Promise<ContentComment> {
    return await this.commentService.update(id, content, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除评论' })
  @ApiParam({ name: 'id', description: '评论ID' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id') id: number,
    @Request() req
  ): Promise<void> {
    await this.commentService.delete(id, req.user);
  }

  @Post(':id/like')
  @ApiOperation({ summary: '点赞评论' })
  @ApiParam({ name: 'id', description: '评论ID' })
  @ApiResponse({ status: 200, description: '点赞成功' })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async like(@Param('id') id: number): Promise<void> {
    await this.commentService.like(id);
  }
} 