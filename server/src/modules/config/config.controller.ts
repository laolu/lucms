import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { ConfigService } from './config.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('系统配置')
@Controller('configs')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get(':key')
  @ApiOperation({ summary: '获取配置值' })
  @ApiParam({ name: 'key', description: '配置键' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async get(@Param('key') key: string) {
    return await this.configService.get(key);
  }

  @Post()
  @ApiOperation({ summary: '创建配置' })
  @ApiResponse({ status: 201, description: '创建成功' })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async set(@Body() createConfigDto: CreateConfigDto) {
    await this.configService.set(
      createConfigDto.key,
      createConfigDto.value,
      createConfigDto.type
    );
    return { success: true };
  }

  @Delete(':key')
  @ApiOperation({ summary: '删除配置' })
  @ApiParam({ name: 'key', description: '配置键' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('key') key: string) {
    await this.configService.delete(key);
    return { success: true };
  }

  @Put('refresh')
  @ApiOperation({ summary: '刷新配置缓存' })
  @ApiResponse({ status: 200, description: '刷新成功' })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async refresh() {
    await this.configService.refresh();
    return { success: true };
  }
} 