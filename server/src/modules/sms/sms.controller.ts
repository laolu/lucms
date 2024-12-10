import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SmsService } from './sms.service';
import { SendSmsDto } from './dto/send-sms.dto';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  async send(@Body() sendSmsDto: SendSmsDto): Promise<void> {
    await this.smsService.send(sendSmsDto);
  }

  @Post('verify')
  async verify(
    @Body('phone') phone: string,
    @Body('code') code: string,
    @Body('type') type: string,
  ): Promise<boolean> {
    return await this.smsService.verify(phone, code, type);
  }
} 