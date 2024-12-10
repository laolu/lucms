import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { VipService } from './vip.service';
import { CreateVipLevelDto } from './dto/create-vip-level.dto';
import { CreateVipOrderDto } from './dto/create-vip-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('vip')
@UseGuards(JwtAuthGuard)
export class VipController {
  constructor(private readonly vipService: VipService) {}

  @Post('levels')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async createVipLevel(@Body() createVipLevelDto: CreateVipLevelDto) {
    return this.vipService.createVipLevel(createVipLevelDto);
  }

  @Get('levels')
  async findAllVipLevels() {
    return this.vipService.findAllVipLevels();
  }

  @Get('levels/:id')
  async findVipLevel(@Param('id') id: string) {
    return this.vipService.findVipLevel(+id);
  }

  @Post('orders')
  async createOrder(
    @Request() req,
    @Body() createVipOrderDto: CreateVipOrderDto
  ) {
    return this.vipService.createOrder(req.user.id, createVipOrderDto);
  }

  @Get('orders')
  async findUserOrders(@Request() req) {
    return this.vipService.findUserOrders(req.user.id);
  }

  @Post('orders/:id/pay')
  async processPayment(
    @Param('id') id: string,
    @Body('paymentMethod') paymentMethod: string
  ) {
    return this.vipService.processPayment(+id, paymentMethod);
  }
} 