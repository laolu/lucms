import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VipService } from './vip.service';
import { VipController } from './vip.controller';
import { VipLevel } from './entities/vip-level.entity';
import { VipOrder } from './entities/vip-order.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VipLevel, VipOrder, User])
  ],
  controllers: [VipController],
  providers: [VipService],
  exports: [VipService]
})
export class VipModule {} 