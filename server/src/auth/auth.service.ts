import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { SmsService } from '../sms/sms.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
    private smsService: SmsService,
  ) {}

  async validateUser(identifier: string, password: string): Promise<any> {
    const user = await this.usersService.findByPhoneOrEmail(identifier);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    // 检查账号是否被锁定
    if (user.isLocked()) {
      throw new UnauthorizedException('账号已被锁定，请稍后再试');
    }

    const securityConfig = await this.configService.getSecurityConfig();

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // 增加登录失败次数
      user.loginAttempts += 1;
      user.lastLoginAttempt = new Date();

      // 如果超过最大尝试次数，锁定账号
      if (user.loginAttempts >= securityConfig.maxLoginAttempts) {
        user.lockedUntil = new Date(Date.now() + securityConfig.loginLockDuration * 60000);
      }

      await this.usersService.update(user.id, user);
      throw new UnauthorizedException('密码错误');
    }

    // 登录成功，重置登录尝试次数
    if (user.loginAttempts > 0) {
      await this.usersService.update(user.id, {
        loginAttempts: 0,
        lastLoginAttempt: null,
        lockedUntil: null,
      });
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(
      loginDto.phone || loginDto.email,
      loginDto.password,
    );

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const payload = { sub: user.id, email: user.email, role: user.role };

    // 发送验证码
    if (user.email) {
      await this.sendVerificationEmail(user.email);
    }
    if (user.phone) {
      await this.sendVerificationSms(user.phone);
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByPhoneOrEmail(
      forgotPasswordDto.phone || forgotPasswordDto.email,
    );

    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    const token = randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 10); // 10分钟后过期

    await this.usersService.update(user.id, {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    });

    // 发送重置密码验证码
    if (forgotPasswordDto.email) {
      await this.mailService.sendPasswordResetCode(forgotPasswordDto.email, token);
    } else if (forgotPasswordDto.phone) {
      await this.smsService.sendPasswordResetCode(forgotPasswordDto.phone, token);
    }

    return { message: '重置密码验证码已发送', token };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findByResetPasswordToken(
      resetPasswordDto.token,
    );

    if (!user) {
      throw new BadRequestException('无效的重置密码令牌');
    }

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      throw new BadRequestException('重置密码令牌已过期');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    await this.usersService.update(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return { message: '密码重置成功' };
  }

  async verifyCode(verifyCodeDto: VerifyCodeDto) {
    const user = await this.usersService.findByVerificationToken(
      verifyCodeDto.token,
    );

    if (!user) {
      throw new BadRequestException('无效的验证码');
    }

    if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
      throw new BadRequestException('验证码已过期');
    }

    if (user.verificationCode !== verifyCodeDto.code) {
      throw new BadRequestException('验证码错误');
    }

    // 更新验证状态
    const updates: Partial<User> = {
      verificationCode: null,
      verificationCodeExpires: null,
    };

    if (user.email) {
      updates.isEmailVerified = true;
    }
    if (user.phone) {
      updates.isPhoneVerified = true;
    }

    await this.usersService.update(user.id, updates);
    return { message: '验证成功' };
  }

  private async sendVerificationEmail(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 600000); // 10分钟后过期

    await this.usersService.update(
      (await this.usersService.findByEmail(email)).id,
      {
        verificationCode: code,
        verificationCodeExpires: expires,
      },
    );

    return this.mailService.sendVerificationCode(email, code);
  }

  private async sendVerificationSms(phone: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 600000); // 10分钟后过期

    await this.usersService.update(
      (await this.usersService.findByPhone(phone)).id,
      {
        verificationCode: code,
        verificationCodeExpires: expires,
      },
    );

    return this.smsService.sendVerificationCode(phone, code);
  }
} 