import { Controller, Post, Body } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SendSmsDto } from './dto/send-sms.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('短信')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  @ApiOperation({ summary: '发送短信' })
  @ApiResponse({ status: 200, description: '发送成功' })
  @ApiResponse({ status: 400, description: '发送失败' })
  async send(@Body() sendSmsDto: SendSmsDto): Promise<void> {
    await this.smsService.send(sendSmsDto);
  }

  @Post('verify')
  @ApiOperation({ summary: '验证短信验证码' })
  @ApiResponse({ status: 200, description: '验证成功' })
  @ApiResponse({ status: 400, description: '验证失败' })
  async verify(
    @Body('phone') phone: string,
    @Body('code') code: string,
    @Body('type') type: string,
  ): Promise<boolean> {
    return await this.smsService.verify(phone, code, type);
  }
} 