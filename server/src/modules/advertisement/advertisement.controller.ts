import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { AdvertisementService } from './advertisement.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { Advertisement } from './entities/advertisement.entity';
import { AdPosition } from '../../common/enums/ad-position.enum';

@Controller('advertisements')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createAdvertisementDto: CreateAdvertisementDto): Promise<Advertisement> {
    return await this.advertisementService.create(createAdvertisementDto);
  }

  @Get()
  async findAll(): Promise<Advertisement[]> {
    return await this.advertisementService.findAll();
  }

  @Get('position/:position')
  async findByPosition(@Param('position') position: AdPosition): Promise<Advertisement[]> {
    return await this.advertisementService.findByPosition(position);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(@Param('id') id: number, @Body() updateData: Partial<Advertisement>): Promise<Advertisement> {
    return await this.advertisementService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('id') id: number): Promise<void> {
    await this.advertisementService.delete(id);
  }
} 