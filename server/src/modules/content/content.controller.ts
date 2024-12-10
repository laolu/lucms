import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './entities/content.entity';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createDto: CreateContentDto): Promise<Content> {
    return await this.contentService.create(createDto);
  }

  @Get()
  async findAll(): Promise<Content[]> {
    return await this.contentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Content> {
    return await this.contentService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateDto: Partial<CreateContentDto>
  ): Promise<Content> {
    return await this.contentService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('id') id: number): Promise<void> {
    await this.contentService.delete(id);
  }

  @Post(':id/view')
  async incrementViewCount(@Param('id') id: number): Promise<void> {
    await this.contentService.incrementViewCount(id);
  }
} 