import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { AdvertisementService, AdListResponse } from './advertisement.service';
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
  async findAll(
    @Query('position') position?: AdPosition,
    @Query('isActive') isActive?: boolean,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sort') sort?: 'ASC' | 'DESC',
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<AdListResponse> {
    return await this.advertisementService.findAll({
      position,
      isActive,
      search,
      sortBy,
      sort,
      page: page ? parseInt(page.toString()) : undefined,
      pageSize: pageSize ? parseInt(pageSize.toString()) : undefined,
    });
  }

  @Get('position/:position')
  async findByPosition(@Param('position') position: AdPosition): Promise<Advertisement[]> {
    return await this.advertisementService.findByPosition(position);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Advertisement> {
    const advertisement = await this.advertisementService.findOne(parseInt(id));
    if (!advertisement) {
      throw new NotFoundException('广告不存在');
    }
    return advertisement;
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