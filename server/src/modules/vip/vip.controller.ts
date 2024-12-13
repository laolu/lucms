import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { VipService } from './vip.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Admin } from '../auth/decorators/admin.decorator';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('vip')
@UseGuards(JwtAuthGuard, AdminGuard)
export class VipController {
  constructor(private readonly vipService: VipService) {}

  @Post()
  @Admin()
  create(@Body() createVipDto: any) {
    return this.vipService.create(createVipDto);
  }

  @Get()
  findAll() {
    return this.vipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vipService.findOne(+id);
  }

  @Put(':id')
  @Admin()
  update(@Param('id') id: string, @Body() updateVipDto: any) {
    return this.vipService.update(+id, updateVipDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.vipService.remove(+id);
  }
} 