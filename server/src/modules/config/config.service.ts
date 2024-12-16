import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { SystemConfig } from './entities/system-config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(SystemConfig)
    private readonly configRepository: Repository<SystemConfig>,
  ) {}

  // 获取所有配置
  async findAll(): Promise<SystemConfig[]> {
    return await this.configRepository.find({
      order: { sort: 'ASC' },
    });
  }

  // 根据分组获取配置
  async findByGroup(group: string): Promise<SystemConfig[]> {
    return await this.configRepository.find({
      where: {
        key: Like(`${group}%`),
        isActive: true
      },
      order: { sort: 'ASC' },
    });
  }

  // 根据键名获取配置
  async findByKey(key: string): Promise<SystemConfig> {
    return await this.configRepository.findOne({
      where: { key },
    });
  }

  // 更新配置
  async update(key: string, value: string): Promise<SystemConfig> {
    const config = await this.findByKey(key);
    if (!config) {
      throw new Error('配置项不存在');
    }

    config.value = value;
    return await this.configRepository.save(config);
  }

  // 测试邮件配置
  async testEmail(): Promise<void> {
    // TODO: 实现发送测试邮件的逻辑
    // 1. 获取邮件配置
    const emailConfigs = await this.findByGroup('email');
    // 2. 使用配置发送测试邮件
    console.log('发送测试邮件', emailConfigs);
  }

  // 刷新配置缓存
  async refresh(): Promise<void> {
    // TODO: 实现配置缓存刷新的逻辑
    // 例如：清除 Redis 缓存等
    console.log('刷新配置缓存');
  }
} 