import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ContentAttributeService } from './content-attribute.service';
import { CreateContentAttributeDto } from './dto/create-content-attribute.dto';
import { ContentAttribute } from './entities/content-attribute.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('content-attributes')
@UseGuards(JwtAuthGuard)
export class ContentAttributeController {
  constructor(private readonly attributeService: ContentAttributeService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createAttributeDto: CreateContentAttributeDto) {
    return this.attributeService.create(createAttributeDto);
  }

  @Get()
  async findAll() {
    return this.attributeService.findAll();
  }

  @Get('active')
  async findActiveAttributes() {
    return this.attributeService.findActiveAttributes();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.attributeService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateAttributeDto: Partial<ContentAttribute>
  ) {
    return this.attributeService.update(+id, updateAttributeDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.attributeService.remove(+id);
  }
} 