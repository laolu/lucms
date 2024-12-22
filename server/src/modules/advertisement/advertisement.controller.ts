import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { AdvertisementService, AdListResponse } from './advertisement.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { Advertisement } from './entities/advertisement.entity';
import { AdPosition } from '../../common/enums/ad-position.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('广告')
@Controller('advertisements')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Post()
  @ApiOperation({ summary: '创建广告' })
  @ApiResponse({ status: 201, description: '广告创建成功', type: Advertisement })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createAdvertisementDto: CreateAdvertisementDto): Promise<Advertisement> {
    return await this.advertisementService.create(createAdvertisementDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有广告' })
  @ApiResponse({ status: 200, description: '获取成功', type: [Advertisement] })
  @ApiQuery({ name: 'position', enum: AdPosition, required: false })
  @ApiQuery({ name: 'isActive', type: Boolean, required: false })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiQuery({ name: 'sortBy', type: String, required: false })
  @ApiQuery({ name: 'sort', enum: ['ASC', 'DESC'], required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
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
  @ApiOperation({ summary: '获取指定位置的广告' })
  @ApiParam({ name: 'position', enum: AdPosition, description: '广告位置' })
  @ApiResponse({ status: 200, description: '获取成功', type: [Advertisement] })
  async findByPosition(@Param('position') position: AdPosition): Promise<Advertisement[]> {
    return await this.advertisementService.findByPosition(position);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个广告' })
  @ApiParam({ name: 'id', description: '广告ID' })
  @ApiResponse({ status: 200, description: '获取成功', type: Advertisement })
  async findOne(@Param('id') id: string): Promise<Advertisement> {
    const advertisement = await this.advertisementService.findOne(parseInt(id));
    if (!advertisement) {
      throw new NotFoundException('广告不存在');
    }
    return advertisement;
  }

  @Put(':id')
  @ApiOperation({ summary: '更新广告' })
  @ApiParam({ name: 'id', description: '广告ID' })
  @ApiResponse({ status: 200, description: '更新成功', type: Advertisement })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(@Param('id') id: number, @Body() updateData: Partial<Advertisement>): Promise<Advertisement> {
    return await this.advertisementService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除广告' })
  @ApiParam({ name: 'id', description: '广告ID' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('id') id: number): Promise<void> {
    await this.advertisementService.delete(id);
  }
} 