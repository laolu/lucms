import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsLog } from './entities/sms-log.entity';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';

@Module({
  imports: [TypeOrmModule.forFeature([SmsLog])],
  controllers: [SmsController],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {} 