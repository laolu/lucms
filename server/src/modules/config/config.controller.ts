import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { ConfigService } from './config.service';
import { CreateConfigDto } from './dto/create-config.dto';

@Controller('configs')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get(':key')
  async get(@Param('key') key: string) {
    return await this.configService.get(key);
  }

  @Post()
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
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('key') key: string) {
    await this.configService.delete(key);
    return { success: true };
  }

  @Put('refresh')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async refresh() {
    await this.configService.refresh();
    return { success: true };
  }
} 