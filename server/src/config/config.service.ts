import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemConfig } from './entities/system-config.entity';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';

@Injectable()
export class ConfigService implements OnModuleInit {
  private cachedConfig: SystemConfig | null = null;

  constructor(
    @InjectRepository(SystemConfig)
    private configRepository: Repository<SystemConfig>,
  ) {}

  async onModuleInit() {
    await this.loadConfig();
  }

  private async loadConfig() {
    let config = await this.configRepository.findOne({ where: { id: 1 } });
    
    if (!config) {
      // 创建默认配置
      config = await this.configRepository.save(
        new SystemConfig({
          emailConfig: {
            host: 'smtp.example.com',
            port: 587,
            secure: true,
            auth: {
              user: '',
              pass: '',
            },
            from: 'noreply@example.com',
          },
          smsConfig: {
            provider: 'aliyun',
            accessKeyId: '',
            accessKeySecret: '',
            signName: '',
            templateCode: '',
          },
          securityConfig: {
            passwordMinLength: 8,
            passwordRequireNumbers: true,
            passwordRequireUppercase: true,
            passwordRequireSpecialChars: true,
            maxLoginAttempts: 5,
            loginLockDuration: 30,
            maxVerificationAttempts: 3,
            verificationCodeExpiry: 10,
            resetPasswordTokenExpiry: 60,
          },
        }),
      );
    }

    this.cachedConfig = config;
  }

  async getConfig(): Promise<SystemConfig> {
    if (!this.cachedConfig) {
      await this.loadConfig();
    }
    return this.cachedConfig!;
  }

  async updateConfig(updateConfigDto: UpdateSystemConfigDto): Promise<SystemConfig> {
    const config = await this.getConfig();
    Object.assign(config, updateConfigDto);
    const updatedConfig = await this.configRepository.save(config);
    this.cachedConfig = updatedConfig;
    return updatedConfig;
  }

  // 获取邮件配置
  async getEmailConfig() {
    const config = await this.getConfig();
    return config.emailConfig;
  }

  // 获取短信配置
  async getSmsConfig() {
    const config = await this.getConfig();
    return config.smsConfig;
  }

  // 获取安全配置
  async getSecurityConfig() {
    const config = await this.getConfig();
    return config.securityConfig;
  }
} 