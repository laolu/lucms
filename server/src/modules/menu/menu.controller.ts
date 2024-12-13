import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Admin } from '../auth/decorators/admin.decorator';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('menus')
@UseGuards(JwtAuthGuard, AdminGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @Admin()
  create(@Body() createMenuDto: any) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Put(':id')
  @Admin()
  update(@Param('id') id: string, @Body() updateMenuDto: any) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
} 