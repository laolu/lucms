import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VipLevel } from './entities/vip-level.entity';
import { VipOrder } from './entities/vip-order.entity';
import { User } from '../users/entities/user.entity';
import { CreateVipLevelDto } from './dto/create-vip-level.dto';
import { CreateVipOrderDto } from './dto/create-vip-order.dto';
import { OrderStatus } from './entities/vip-order.entity';

@Injectable()
export class VipService {
  constructor(
    @InjectRepository(VipLevel)
    private vipLevelRepository: Repository<VipLevel>,
    @InjectRepository(VipOrder)
    private vipOrderRepository: Repository<VipOrder>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createVipLevel(createVipLevelDto: CreateVipLevelDto): Promise<VipLevel> {
    const vipLevel = this.vipLevelRepository.create(createVipLevelDto);
    return this.vipLevelRepository.save(vipLevel);
  }

  async findAllVipLevels(): Promise<VipLevel[]> {
    return this.vipLevelRepository.find({
      where: { isActive: true },
      order: { sort: 'ASC' }
    });
  }

  async findVipLevel(id: number): Promise<VipLevel> {
    const vipLevel = await this.vipLevelRepository.findOne({ where: { id } });
    if (!vipLevel) {
      throw new NotFoundException('会员等级不存在');
    }
    return vipLevel;
  }

  async createOrder(userId: number, createVipOrderDto: CreateVipOrderDto): Promise<VipOrder> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const vipLevel = await this.findVipLevel(createVipOrderDto.vipLevelId);
    if (!vipLevel.isActive) {
      throw new BadRequestException('该会员等级已停用');
    }

    const order = this.vipOrderRepository.create({
      orderNo: this.generateOrderNo(),
      user,
      vipLevel,
      amount: vipLevel.price,
      status: OrderStatus.PENDING
    });

    return this.vipOrderRepository.save(order);
  }

  async findUserOrders(userId: number): Promise<VipOrder[]> {
    return this.vipOrderRepository.find({
      where: { user: { id: userId } },
      relations: ['vipLevel'],
      order: { createdAt: 'DESC' }
    });
  }

  async processPayment(orderId: number, paymentMethod: string): Promise<VipOrder> {
    const order = await this.vipOrderRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'vipLevel']
    });

    if (!order) {
      throw new NotFoundException('订单不存在');
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('订单状态异常');
    }

    // 更新订单状态
    order.status = OrderStatus.PAID;
    order.paymentMethod = paymentMethod;
    order.paymentTime = new Date();
    await this.vipOrderRepository.save(order);

    // 更新用户会员信息
    const user = order.user;
    const currentTime = new Date();
    const expiryTime = user.membershipExpiry && user.membershipExpiry > currentTime
      ? new Date(user.membershipExpiry.getTime() + (order.vipLevel.duration * 24 * 60 * 60 * 1000))
      : new Date(currentTime.getTime() + (order.vipLevel.duration * 24 * 60 * 60 * 1000));

    user.membershipExpiry = expiryTime;
    await this.userRepository.save(user);

    return order;
  }

  private generateOrderNo(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `VIP${timestamp}${random}`;
  }
} 