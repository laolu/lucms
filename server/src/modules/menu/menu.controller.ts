import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Admin } from '../auth/decorators/admin.decorator';
import { AdminGuard } from '../auth/guards/admin.guard';
import { MenuQueryDto } from './dto/menu-query.dto';
import { CreateMenuDto } from './dto/create-menu.dto';

@Controller('menus')
@UseGuards(JwtAuthGuard, AdminGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @Admin()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll(@Query() query: MenuQueryDto) {
    return this.menuService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Put(':id')
  @Admin()
  update(@Param('id') id: string, @Body() updateMenuDto: Partial<CreateMenuDto>) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
} 