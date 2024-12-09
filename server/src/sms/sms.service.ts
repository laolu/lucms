import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as Core from '@alicloud/pop-core';

@Injectable()
export class SmsService {
  private client: Core | null = null;

  constructor(private configService: ConfigService) {}

  private async createClient() {
    const smsConfig = await this.configService.getSmsConfig();
    
    if (smsConfig.provider === 'aliyun') {
      return new Core({
        accessKeyId: smsConfig.accessKeyId,
        accessKeySecret: smsConfig.accessKeySecret,
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25',
      });
    } else if (smsConfig.provider === 'tencent') {
      // 实现腾讯云短信服务
      throw new Error('腾讯云短信服务尚未实现');
    }
  }

  private async getClient() {
    if (!this.client) {
      this.client = await this.createClient();
    }
    return this.client;
  }

  async sendSms(phoneNumber: string, templateParam: Record<string, string>) {
    const client = await this.getClient();
    const smsConfig = await this.configService.getSmsConfig();

    if (smsConfig.provider === 'aliyun') {
      const params = {
        RegionId: 'cn-hangzhou',
        PhoneNumbers: phoneNumber,
        SignName: smsConfig.signName,
        TemplateCode: smsConfig.templateCode,
        TemplateParam: JSON.stringify(templateParam),
      };

      return client.request('SendSms', params, { method: 'POST' });
    } else if (smsConfig.provider === 'tencent') {
      // 实现腾讯云短信发送
      throw new Error('腾讯云短信服务尚未实现');
    }
  }

  async sendVerificationCode(phoneNumber: string, code: string) {
    return this.sendSms(phoneNumber, { code });
  }

  async sendPasswordResetCode(phoneNumber: string, code: string) {
    return this.sendSms(phoneNumber, { code });
  }
} 