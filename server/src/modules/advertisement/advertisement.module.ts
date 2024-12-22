import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisement } from './entities/advertisement.entity';
import { AdContent } from './entities/ad-content.entity';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './advertisement.service';
import { AdminGuard } from '../../guards/admin.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement, AdContent])],
  controllers: [AdvertisementController],
  providers: [
    AdvertisementService,
    AdminGuard
  ],
  exports: [AdvertisementService],
})
export class AdvertisementModule {} 