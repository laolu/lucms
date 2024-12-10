import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemConfig } from './entities/system-config.entity';

@Injectable()
export class ConfigService {
  private configs: Map<string, any> = new Map();

  constructor(
    @InjectRepository(SystemConfig)
    private configRepository: Repository<SystemConfig>,
  ) {
    this.loadConfigs();
  }

  private async loadConfigs() {
    const configs = await this.configRepository.find();
    configs.forEach(config => {
      this.configs.set(config.key, this.parseValue(config.value, config.type));
    });
  }

  private parseValue(value: string, type: string): any {
    switch (type) {
      case 'number':
        return Number(value);
      case 'boolean':
        return value === 'true';
      case 'json':
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      default:
        return value;
    }
  }

  async get(key: string): Promise<any> {
    if (!this.configs.has(key)) {
      await this.loadConfigs();
    }
    return this.configs.get(key);
  }

  async set(key: string, value: any, type: string = 'string'): Promise<void> {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    
    let config = await this.configRepository.findOne({ where: { key } });
    if (config) {
      config.value = stringValue;
      config.type = type;
      await this.configRepository.save(config);
    } else {
      config = this.configRepository.create({
        key,
        value: stringValue,
        type,
      });
      await this.configRepository.save(config);
    }

    this.configs.set(key, this.parseValue(stringValue, type));
  }

  async delete(key: string): Promise<void> {
    await this.configRepository.delete({ key });
    this.configs.delete(key);
  }

  async refresh(): Promise<void> {
    await this.loadConfigs();
  }
} 