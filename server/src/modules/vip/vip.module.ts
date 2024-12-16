import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VipLevelController } from './vip-level.controller';
import { VipLevelService } from './vip-level.service';
import { VipLevel } from './entities/vip-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VipLevel])],
  controllers: [VipLevelController],
  providers: [VipLevelService],
  exports: [VipLevelService],
})
export class VipModule {} 