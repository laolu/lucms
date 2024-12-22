import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentAttributeValueService } from './content-attribute-value.service';

@Controller('content-attribute-values')
export class ContentAttributeValueController {
  constructor(private readonly service: ContentAttributeValueService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.service.create(createDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
} 