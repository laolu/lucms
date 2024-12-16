import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VipLevelService } from './vip-level.service';
import { CreateVipLevelDto } from './dto/create-vip-level.dto';
import { UpdateVipLevelDto } from './dto/update-vip-level.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Controller('vip-levels')
export class VipLevelController {
  constructor(private readonly vipLevelService: VipLevelService) {}

  @Post()
  create(@Body() createVipLevelDto: CreateVipLevelDto) {
    return this.vipLevelService.create(createVipLevelDto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.vipLevelService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vipLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVipLevelDto: UpdateVipLevelDto) {
    return this.vipLevelService.update(+id, updateVipLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vipLevelService.remove(+id);
  }
} 