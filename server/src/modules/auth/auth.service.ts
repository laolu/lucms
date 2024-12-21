import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { SmsService } from '../sms/sms.service';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private smsService: SmsService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByPhoneOrEmail(username);
    if (!user) {
      return null;
    }

    // 检查用户是否被锁定
    if (user.lockoutUntil && moment(user.lockoutUntil).isAfter(moment())) {
      throw new UnauthorizedException('账号已被锁定，请稍后再试');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      // 增加登录尝试次数
      const loginAttempts = (user.loginAttempts || 0) + 1;
      await this.usersService.update(user.id, { loginAttempts });
      
      // 如果达到最大尝试次数，锁定账户
      if (loginAttempts >= 5) {
        await this.usersService.update(user.id, {
          loginAttempts: 0,
          lockoutUntil: moment().add(1, 'hour').toDate()
        });
        throw new UnauthorizedException('登录尝试次数过多，账号已被锁定1小时');
      }
      
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: User) {
    // 检查用户是否被锁定
    if (user.lockoutUntil && moment(user.lockoutUntil).isAfter(moment())) {
      throw new UnauthorizedException('账号已被锁定，请稍后再试');
    }

    // 检查登录尝试次数
    if (user.loginAttempts >= 5) {
      // 锁定账户1小时
      await this.usersService.update(user.id, {
        loginAttempts: 0,
        lockoutUntil: moment().add(1, 'hour').toDate()
      });
      throw new UnauthorizedException('登录尝试次数过多，账号已被锁定1小时');
    }

    // 登录成功，重置登录尝试次数
    await this.usersService.update(user.id, {
      loginAttempts: 0,
      lockoutUntil: null,
      lastLoginAt: new Date()
    });

    const payload = {
      username: user.username,
      sub: user.id,
      isAdmin: user.isAdmin
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin
      }
    };
  }

  async register(registerDto: RegisterDto) {
    // 检查用户名/邮箱/手机号是否已存在
    const existingUser = await this.usersService.findByPhoneOrEmail(
      registerDto.email || registerDto.phone
    );
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // 创建新用户
    const createUserDto: CreateUserDto = {
      username: registerDto.username,
      password: registerDto.password,
      isAdmin: false
    };

    if (registerDto.email) {
      createUserDto.email = registerDto.email;
    }
    if (registerDto.phone) {
      createUserDto.phone = registerDto.phone;
    }
    if (registerDto.nickname) {
      createUserDto.nickname = registerDto.nickname;
    }

    const user = await this.usersService.create(createUserDto);

    // 发送验证码
    if (registerDto.email) {
      // TODO: 发送邮箱验证码
    }
    if (registerDto.phone) {
      await this.smsService.sendVerificationCode(registerDto.phone);
    }

    return this.login(user);
  }

  async forgotPassword(phoneOrEmail: string) {
    const user = await this.usersService.findByPhoneOrEmail(phoneOrEmail);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // 生成重置密码令牌
    const resetPasswordToken = Math.random().toString(36).substring(2, 15);
    await this.usersService.update(user.id, {
      resetPasswordToken,
      resetPasswordTokenExpiredAt: moment().add(1, 'hour').toDate()
    });

    // 发送重置密码验���码
    if (user.phone) {
      await this.smsService.sendPasswordResetCode(user.phone);
    }
    // TODO: 如果是邮箱，发送邮箱验证码

    return { message: 'Reset password instructions have been sent' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.usersService.findByResetPasswordToken(token);
    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // 重置密码
    await this.usersService.update(user.id, {
      password: newPassword,
      resetPasswordToken: null,
      resetPasswordTokenExpiredAt: null
    });

    return { message: 'Password has been reset successfully' };
  }

  async verifyCode(userId: number, verifyCodeDto: VerifyCodeDto) {
    const user = await this.usersService.findByVerificationToken(verifyCodeDto.code);
    if (!user || user.id !== userId) {
      throw new BadRequestException('Invalid verification code');
    }

    // 检查验证码是否过期
    if (moment(user.verificationCodeExpiredAt).isBefore(moment())) {
      throw new BadRequestException('Verification code has expired');
    }

    // 更新用户状态
    const updateData: Partial<User> = {
      verificationCode: null,
      verificationCodeExpiredAt: null
    };

    // 根据验证类型更新验证状态
    if (!user.emailVerifiedAt && user.email) {
      updateData.emailVerifiedAt = new Date();
    }
    if (!user.phoneVerifiedAt && user.phone) {
      updateData.phoneVerifiedAt = new Date();
    }

    await this.usersService.update(user.id, updateData);
    return { message: 'Verification successful' };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const user = await this.usersService.findByEmail(verifyEmailDto.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // 验证验证码
    // TODO: 现邮箱验证码验证逻辑

    await this.usersService.update(user.id, {
      verificationCode: null,
      emailVerifiedAt: new Date()
    });

    return { message: 'Email verified successfully' };
  }

  async verifyPhone(verifyPhoneDto: VerifyPhoneDto) {
    const user = await this.usersService.findByPhone(verifyPhoneDto.phone);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // 验证短信验证码
    const isValid = await this.smsService.verify(
      verifyPhoneDto.phone,
      verifyPhoneDto.code
    );

    if (!isValid) {
      throw new BadRequestException('Invalid verification code');
    }

    await this.usersService.update(user.id, {
      verificationCode: null,
      phoneVerifiedAt: new Date()
    });

    return { message: 'Phone number verified successfully' };
  }

  async resendVerificationCode(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.phone) {
      await this.smsService.sendVerificationCode(user.phone);
    }
    // TODO: 如果是邮箱，发送邮箱验证码

    return { message: 'Verification code has been resent' };
  }
} 