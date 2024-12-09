import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createContentDto: any, @Request() req) {
    return this.contentService.create({
      ...createContentDto,
      author: req.user,
    });
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: any) {
    return this.contentService.update(+id, updateContentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/download')
  async download(@Param('id') id: string) {
    await this.contentService.incrementDownloads(+id);
    const content = await this.contentService.findOne(+id);
    return { downloadUrl: content.filePath };
  }

  @Get(':id/view')
  async view(@Param('id') id: string) {
    await this.contentService.incrementViews(+id);
    return this.contentService.findOne(+id);
  }
} 