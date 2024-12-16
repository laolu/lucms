import { IsEnum, IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { OrderType, OrderStatus, PaymentMethod } from '../entities/order.entity';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class OrderQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;  // 搜索关键字（订单号、用户名等）

  @IsOptional()
  @IsEnum(OrderType)
  type?: OrderType;  // 订单类型

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;  // 订单状态

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;  // 支付方式

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  userId?: number;  // 用户ID

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  contentId?: number;  // 内容ID

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  vipLevelId?: number;  // VIP等级ID

  @IsOptional()
  @IsDateString()
  startDate?: string;  // 开始日期

  @IsOptional()
  @IsDateString()
  endDate?: string;  // 结束日期

  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';  // 排序字段

  @IsOptional()
  @IsString()
  sort?: 'ASC' | 'DESC' = 'DESC';  // 排序方向
} 