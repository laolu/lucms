import { Controller, Get, Put, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { ConfigService } from './config.service';
import { SystemConfig } from './entities/system-config.entity';

@Controller('configs')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async findAll(): Promise<SystemConfig[]> {
    return await this.configService.findAll();
  }

  @Get('basic')
  async getBasicConfigs(): Promise<SystemConfig[]> {
    return await this.configService.findByGroup('basic');
  }

  @Get('email')
  async getEmailConfigs(): Promise<SystemConfig[]> {
    return await this.configService.findByGroup('email');
  }

  @Get('storage')
  async getStorageConfigs(): Promise<SystemConfig[]> {
    return await this.configService.findByGroup('storage');
  }

  @Get('sms')
  async getSmsConfigs(): Promise<SystemConfig[]> {
    return await this.configService.findByGroup('sms');
  }

  @Get('payment')
  async getPaymentConfigs(): Promise<SystemConfig[]> {
    return await this.configService.findByGroup('payment');
  }

  @Get('oauth')
  async getOauthConfigs(): Promise<SystemConfig[]> {
    return await this.configService.findByGroup('oauth');
  }

  @Put(':key')
  async update(
    @Param('key') key: string,
    @Body('value') value: string,
  ): Promise<SystemConfig> {
    return await this.configService.update(key, value);
  }

  @Post('email/test')
  async testEmail(): Promise<void> {
    await this.configService.testEmail();
  }

  @Post('refresh')
  async refresh(): Promise<void> {
    await this.configService.refresh();
  }
} 