import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderQueryDto } from './dto/order-query.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // 获取订单列表
  async findAll(query: OrderQueryDto) {
    const {
      page = 1,
      pageSize = 10,
      search,
      type,
      status,
      paymentMethod,
      userId,
      contentId,
      vipLevelId,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sort = 'DESC',
    } = query;

    const qb = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.content', 'content')
      .leftJoinAndSelect('order.vipLevel', 'vipLevel');

    // 搜索条件
    if (search) {
      qb.andWhere('(order.orderNo LIKE :search OR user.username LIKE :search)', {
        search: `%${search}%`,
      });
    }

    // 筛选条件
    if (type) {
      qb.andWhere('order.type = :type', { type });
    }
    if (status) {
      qb.andWhere('order.status = :status', { status });
    }
    if (paymentMethod) {
      qb.andWhere('order.paymentMethod = :paymentMethod', { paymentMethod });
    }
    if (userId) {
      qb.andWhere('order.userId = :userId', { userId });
    }
    if (contentId) {
      qb.andWhere('order.contentId = :contentId', { contentId });
    }
    if (vipLevelId) {
      qb.andWhere('order.vipLevelId = :vipLevelId', { vipLevelId });
    }
    if (startDate && endDate) {
      qb.andWhere('order.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    // 排序
    qb.orderBy(`order.${sortBy}`, sort);

    // 分页
    const [items, total] = await qb
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // 获取订单详情
  async findOne(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'content', 'vipLevel'],
    });
  }

  // 创建订单
  async create(data: Partial<Order>) {
    const order = this.orderRepository.create(data);
    return this.orderRepository.save(order);
  }

  // 更新订单
  async update(id: number, data: Partial<Order>) {
    await this.orderRepository.update(id, data);
    return this.findOne(id);
  }

  // 取消订单
  async cancel(id: number, reason: string) {
    const order = await this.findOne(id);
    if (!order || order.status !== OrderStatus.PENDING) {
      throw new Error('订单不存在或状态不允许取消');
    }

    return this.update(id, {
      status: OrderStatus.CANCELLED,
      cancelTime: new Date(),
      cancelReason: reason,
    });
  }

  // 退款
  async refund(id: number, amount: number, reason: string) {
    const order = await this.findOne(id);
    if (!order || order.status !== OrderStatus.PAID) {
      throw new Error('订单不存在或状态不允许退款');
    }

    return this.update(id, {
      status: OrderStatus.REFUNDED,
      refundTime: new Date(),
      refundAmount: amount,
      refundReason: reason,
    });
  }

  // 支付成功
  async paymentSuccess(id: number, paymentMethod: string, paymentNo: string) {
    const order = await this.findOne(id);
    if (!order || order.status !== OrderStatus.PENDING) {
      throw new Error('订单不存在或状态不允许支付');
    }

    return this.update(id, {
      status: OrderStatus.PAID,
      paymentMethod,
      paymentNo,
      paymentTime: new Date(),
    });
  }

  // 获取订单统计信息
  async getStats(startDate: Date, endDate: Date) {
    const qb = this.orderRepository.createQueryBuilder('order');

    const stats = await qb
      .select([
        'COUNT(*) as totalOrders',
        'SUM(CASE WHEN status = :paid THEN 1 ELSE 0 END) as paidOrders',
        'SUM(CASE WHEN status = :paid THEN amount ELSE 0 END) as totalAmount',
        'COUNT(DISTINCT userId) as totalUsers',
      ])
      .where('createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
        paid: OrderStatus.PAID,
      })
      .getRawOne();

    return stats;
  }
} 