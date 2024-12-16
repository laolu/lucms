import { Controller, Get, Put, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { ConfigService } from './config.service';
import { SystemConfig } from './entities/system-config.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('系统配置')
@Controller('configs')
@UseGuards(AuthGuard('jwt'), AdminGuard)
@ApiBearerAuth()
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @ApiOperation({ summary: '获取所有配置' })
  @ApiResponse({ status: 200, description: '获取成功', type: [SystemConfig] })
  async findAll(): Promise<SystemConfig[]> {
    return await this.configService.findAll();
  }

  @Get('basic')
  @ApiOperation({ summary: '获取基础配置' })
  @ApiResponse({ status: 200, description: '获取成功', type: [SystemConfig] })
  async getBasicConfigs(): Promise<SystemConfig[]> {
    return await this.configService.findByGroup('basic');
  }

  @Get('email')
  @ApiOperation({ summary: '获取邮件配置' })
  @ApiResponse({ status: 200, description: '获取成功', type: [SystemConfig] })
  async getEmailConfigs(): Promise<SystemConfig[]> {
    return await this.configService.findByGroup('email');
  }

  @Get('storage')
  @ApiOperation({ summary: '获取存储配置' })
  @ApiResponse({ status: 200, description: '获取成功', type: [SystemConfig] })
  async getStorageConfigs(): Promise<SystemConfig[]> {
    return await this.configService.findByGroup('storage');
  }

  @Get('sms')
  @ApiOperation({ summary: '获取短信配置' })
  @ApiResponse({ status: 200, description: '获取成功', type: [SystemConfig] })
  async getSmsConfigs(): Promise<SystemConfig[]> {
    return await this.configService.findByGroup('sms');
  }

  @Get('payment')
  @ApiOperation({ summary: '获取支付配置' })
  @ApiResponse({ status: 200, description: '获取成功', type: [SystemConfig] })
  async getPaymentConfigs(): Promise<SystemConfig[]> {
    return await this.configService.findByGroup('payment');
  }

  @Get('oauth')
  @ApiOperation({ summary: '获取第三方登录配置' })
  @ApiResponse({ status: 200, description: '获取成功', type: [SystemConfig] })
  async getOauthConfigs(): Promise<SystemConfig[]> {
    return await this.configService.findByGroup('oauth');
  }

  @Put(':key')
  @ApiOperation({ summary: '更新配置' })
  @ApiResponse({ status: 200, description: '更新成功', type: SystemConfig })
  async update(
    @Param('key') key: string,
    @Body('value') value: string,
  ): Promise<SystemConfig> {
    return await this.configService.update(key, value);
  }

  @Post('email/test')
  @ApiOperation({ summary: '发送测试邮件' })
  @ApiResponse({ status: 200, description: '发送成功' })
  async testEmail(): Promise<void> {
    await this.configService.testEmail();
  }

  @Post('refresh')
  @ApiOperation({ summary: '刷新配置缓存' })
  @ApiResponse({ status: 200, description: '刷新成功' })
  async refresh(): Promise<void> {
    await this.configService.refresh();
  }
} 