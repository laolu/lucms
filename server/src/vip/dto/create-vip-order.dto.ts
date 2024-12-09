import { IsNumber } from 'class-validator';

export class CreateVipOrderDto {
  @IsNumber()
  vipLevelId: number;
} 