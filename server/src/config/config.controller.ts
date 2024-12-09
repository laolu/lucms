import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ConfigService } from './config.service';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';

@Controller('config')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async getConfig() {
    return this.configService.getConfig();
  }

  @Put()
  async updateConfig(@Body() updateConfigDto: UpdateSystemConfigDto) {
    return this.configService.updateConfig(updateConfigDto);
  }

  @Get('email')
  async getEmailConfig() {
    return this.configService.getEmailConfig();
  }

  @Get('sms')
  async getSmsConfig() {
    return this.configService.getSmsConfig();
  }

  @Get('security')
  async getSecurityConfig() {
    return this.configService.getSecurityConfig();
  }
} 