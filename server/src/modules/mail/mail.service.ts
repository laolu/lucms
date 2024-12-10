import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private async initializeTransporter() {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: this.configService.get('MAIL_PORT') === 465,
      auth: {
        user: this.configService.get('MAIL_USERNAME'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendMail(to: string, subject: string, content: string): Promise<void> {
    await this.transporter.sendMail({
      from: `${this.configService.get('MAIL_FROM_NAME')} <${this.configService.get('MAIL_FROM_ADDRESS')}>`,
      to,
      subject,
      html: content,
    });
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    const subject = '邮箱验证码';
    const content = `
      <h1>邮箱验证码</h1>
      <p>您的验证码是：<strong>${code}</strong></p>
      <p>验证码有效期为5分钟，请尽快验证。</p>
      <p>如果这不是您的操作，请忽略此邮件。</p>
    `;
    await this.sendMail(email, subject, content);
  }

  async sendPasswordResetCode(email: string, code: string): Promise<void> {
    const subject = '重置密码验证码';
    const content = `
      <h1>重置密码验证码</h1>
      <p>您的验证码是：<strong>${code}</strong></p>
      <p>验证码有效期为5分钟，请尽快验证。</p>
      <p>如果这不是您的操作，请忽略此邮件。</p>
    `;
    await this.sendMail(email, subject, content);
  }

  async sendWelcomeEmail(email: string, username: string): Promise<void> {
    const subject = '欢迎注册';
    const content = `
      <h1>欢迎加入我们</h1>
      <p>亲爱的 ${username}：</p>
      <p>感谢您的注册！我们很高兴您能加入我们。</p>
      <p>如果您有任何问题，请随时联系我们。</p>
    `;
    await this.sendMail(email, subject, content);
  }
} 