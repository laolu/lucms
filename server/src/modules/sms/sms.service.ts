import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { SmsLog } from './entities/sms-log.entity';
import { SendSmsDto } from './dto/send-sms.dto';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';

@Injectable()
export class SmsService {
  constructor(
    @InjectRepository(SmsLog)
    private smsLogRepository: Repository<SmsLog>,
    private configService: ConfigService,
  ) {}

  async send(sendSmsDto: SendSmsDto): Promise<void> {
    const { phone, type = 'VERIFICATION' } = sendSmsDto;

    // 检查是否有未过期的验证码
    const existingCode = await this.smsLogRepository.findOne({
      where: {
        phone,
        type,
        isUsed: false,
        expiredAt: LessThan(new Date()),
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (existingCode) {
      throw new BadRequestException('Please wait before requesting a new code');
    }

    // 生成6位随机验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const content = `Your verification code is: ${code}`;

    try {
      // TODO: 调用实际的短信发送服务
      // const response = await this.sendViaSmsProvider(phone, content);

      // 记录发送日志
      const smsLog = this.smsLogRepository.create({
        phone,
        code,
        content,
        type,
        isSuccess: true,
        expiredAt: moment().add(5, 'minutes').toDate(), // 5分钟后过期
      });

      await this.smsLogRepository.save(smsLog);
    } catch (error) {
      // 记录发送失败日志
      const smsLog = this.smsLogRepository.create({
        phone,
        code,
        content,
        type,
        isSuccess: false,
        error: error.message,
        expiredAt: moment().add(5, 'minutes').toDate(),
      });

      await this.smsLogRepository.save(smsLog);
      throw error;
    }
  }

  async verify(phone: string, code: string, type: string = 'VERIFICATION'): Promise<boolean> {
    const smsLog = await this.smsLogRepository.findOne({
      where: {
        phone,
        code,
        type,
        isUsed: false,
        isSuccess: true,
        expiredAt: LessThan(new Date()),
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!smsLog) {
      return false;
    }

    // 标记验证码为已使用
    smsLog.isUsed = true;
    smsLog.usedAt = new Date();
    await this.smsLogRepository.save(smsLog);

    return true;
  }

  async sendVerificationCode(phone: string): Promise<void> {
    await this.send({ phone, type: 'VERIFICATION' });
  }

  async sendPasswordResetCode(phone: string): Promise<void> {
    await this.send({ phone, type: 'PASSWORD_RESET' });
  }

  async cleanupExpiredCodes(): Promise<void> {
    // 删除30天前的验证码记录
    const thirtyDaysAgo = moment().subtract(30, 'days').toDate();
    await this.smsLogRepository.delete({
      createdAt: LessThan(thirtyDaysAgo),
    });
  }
} 