import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('system_configs')
export class SystemConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'json' })
  emailConfig: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    from: string;
  };

  @Column({ type: 'json' })
  smsConfig: {
    provider: 'aliyun' | 'tencent';
    accessKeyId: string;
    accessKeySecret: string;
    signName: string;
    templateCode: string;
  };

  @Column({ type: 'json' })
  securityConfig: {
    passwordMinLength: number;
    passwordRequireNumbers: boolean;
    passwordRequireUppercase: boolean;
    passwordRequireSpecialChars: boolean;
    maxLoginAttempts: number;
    loginLockDuration: number; // 锁定时长（分钟）
    maxVerificationAttempts: number;
    verificationCodeExpiry: number; // 验证码有效期（分钟）
    resetPasswordTokenExpiry: number; // 重置密码令牌有效期（分钟）
  };

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<SystemConfig>) {
    Object.assign(this, partial);
  }
} 