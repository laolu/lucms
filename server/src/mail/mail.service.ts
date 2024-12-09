import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {}

  private async createTransporter() {
    const emailConfig = await this.configService.getEmailConfig();
    return nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    if (!this.transporter) {
      this.transporter = await this.createTransporter();
    }

    const emailConfig = await this.configService.getEmailConfig();
    return this.transporter.sendMail({
      from: emailConfig.from,
      to,
      subject,
      html,
    });
  }

  async sendVerificationCode(to: string, code: string) {
    const subject = '验证码';
    const html = `
      <h1>验证码</h1>
      <p>您的验��码是: <strong>${code}</strong></p>
      <p>验证码有效期为10分钟。</p>
      <p>如果这不是您的操作，请忽略此邮件。</p>
    `;
    return this.sendMail(to, subject, html);
  }

  async sendPasswordResetCode(to: string, code: string) {
    const subject = '重置密码';
    const html = `
      <h1>重置密码</h1>
      <p>您的验证码是: <strong>${code}</strong></p>
      <p>验证码有效期为10分钟。</p>
      <p>如果这不是您的操作，请忽略此邮件。</p>
    `;
    return this.sendMail(to, subject, html);
  }
} 