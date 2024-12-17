import { Controller, Get, Post, Put, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderQueryDto } from './dto/order-query.dto';
import { Order } from './entities/order.entity';
import { PaymentMethod } from './entities/order.entity';

@ApiTags('订单管理')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: '获取订单列表' })
  async findAll(@Query() query: OrderQueryDto) {
    return this.orderService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取订单详情' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '创建订单' })
  async create(@Body() data: Partial<Order>) {
    return this.orderService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新订单' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Order>,
  ) {
    return this.orderService.update(id, data);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: '取消订单' })
  async cancel(
    @Param('id', ParseIntPipe) id: number,
    @Body('reason') reason: string,
  ) {
    return this.orderService.cancel(id, reason);
  }

  @Post(':id/refund')
  @ApiOperation({ summary: '订单退款' })
  async refund(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
    @Body('reason') reason: string,
  ) {
    return this.orderService.refund(id, amount, reason);
  }

  @Post(':id/payment-success')
  @ApiOperation({ summary: '支付成功回调' })
  async paymentSuccess(
    @Param('id', ParseIntPipe) id: number,
    @Body('paymentMethod') paymentMethod: PaymentMethod,
    @Body('paymentNo') paymentNo: string,
  ) {
    return this.orderService.paymentSuccess(id, paymentMethod, paymentNo);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取订单统计信息' })
  async getStats(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.orderService.getStats(new Date(startDate), new Date(endDate));
  }
} 