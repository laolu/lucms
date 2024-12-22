import { Controller, Get, Post, Put, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderQueryDto } from './dto/order-query.dto';
import { Order } from './entities/order.entity';
import { PaymentMethod } from './entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(@Query() query: OrderQueryDto) {
    return this.orderService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Order>) {
    return this.orderService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Order>,
  ) {
    return this.orderService.update(id, data);
  }

  @Post(':id/cancel')
  async cancel(
    @Param('id', ParseIntPipe) id: number,
    @Body('reason') reason: string,
  ) {
    return this.orderService.cancel(id, reason);
  }

  @Post(':id/refund')
  async refund(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
    @Body('reason') reason: string,
  ) {
    return this.orderService.refund(id, amount, reason);
  }

  @Post(':id/payment-success')
  async paymentSuccess(
    @Param('id', ParseIntPipe) id: number,
    @Body('paymentMethod') paymentMethod: PaymentMethod,
    @Body('paymentNo') paymentNo: string,
  ) {
    return this.orderService.paymentSuccess(id, paymentMethod, paymentNo);
  }

  @Get('stats')
  async getStats(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.orderService.getStats(new Date(startDate), new Date(endDate));
  }
} 