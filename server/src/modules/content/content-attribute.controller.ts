import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { ContentAttributeService } from './content-attribute.service';
import { CreateContentAttributeDto } from './dto/content-attribute.dto';
import { ContentAttribute } from './entities/content-attribute.entity';

@Controller('content-attributes')
export class ContentAttributeController {
  constructor(private readonly attributeService: ContentAttributeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createDto: CreateContentAttributeDto): Promise<ContentAttribute> {
    return await this.attributeService.create(createDto);
  }

  @Get()
  async findAll(): Promise<ContentAttribute[]> {
    return await this.attributeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ContentAttribute> {
    return await this.attributeService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateDto: Partial<CreateContentAttributeDto>
  ): Promise<ContentAttribute> {
    return await this.attributeService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('id') id: number): Promise<void> {
    await this.attributeService.delete(id);
  }
} 