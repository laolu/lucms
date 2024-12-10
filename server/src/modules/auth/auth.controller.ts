import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiResponse({ status: 200, description: '登录成功', type: Object })
  @ApiResponse({ status: 401, description: '登录失败' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email || loginDto.phone,
      loginDto.password
    );
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiResponse({ status: 201, description: '注册成功', type: User })
  @ApiResponse({ status: 400, description: '注册失败' })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: '忘记密码' })
  @ApiResponse({ status: 200, description: '重置密码邮件/短信已发送' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(
      forgotPasswordDto.email || forgotPasswordDto.phone
    );
  }

  @Post('reset-password')
  @ApiOperation({ summary: '重置密码' })
  @ApiResponse({ status: 200, description: '密码重置成功' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword
    );
  }

  @Post('verify-email')
  @ApiOperation({ summary: '验证邮箱' })
  @ApiResponse({ status: 200, description: '邮箱验证成功' })
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return await this.authService.verifyEmail(verifyEmailDto);
  }

  @Post('verify-phone')
  @ApiOperation({ summary: '验证手机号' })
  @ApiResponse({ status: 200, description: '手机号验证成功' })
  async verifyPhone(@Body() verifyPhoneDto: VerifyPhoneDto) {
    return await this.authService.verifyPhone(verifyPhoneDto);
  }

  @Post('verify-code')
  @ApiOperation({ summary: '验证验证码' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: '验证码���证成功' })
  async verifyCode(@Request() req, @Body() verifyCodeDto: VerifyCodeDto) {
    return await this.authService.verifyCode(req.user.id, verifyCodeDto);
  }

  @Post('resend-code')
  @ApiOperation({ summary: '重新发送验证码' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: '验证码已重新发送' })
  async resendVerificationCode(@Request() req) {
    return await this.authService.resendVerificationCode(req.user.id);
  }

  @Get('profile')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: '获取成功', type: User })
  getProfile(@Request() req) {
    return req.user;
  }
} 