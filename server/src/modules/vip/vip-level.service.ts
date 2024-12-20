import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VipLevel } from './entities/vip-level.entity';
import { CreateVipLevelDto } from './dto/create-vip-level.dto';
import { UpdateVipLevelDto } from './dto/update-vip-level.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@Injectable()
export class VipLevelService {
  private readonly logger = new Logger(VipLevelService.name);

  constructor(
    @InjectRepository(VipLevel)
    private readonly vipLevelRepository: Repository<VipLevel>,
  ) {}

  async create(createVipLevelDto: CreateVipLevelDto) {
    try {
      this.logger.log(`开始创建VIP等级: ${JSON.stringify(createVipLevelDto)}`);

      // 验证必填字段
      if (!createVipLevelDto.name) {
        throw new BadRequestException('等级名称不能为空');
      }
      if (!createVipLevelDto.description) {
        throw new BadRequestException('等级描述不能为空');
      }
      if (typeof createVipLevelDto.price !== 'number' || createVipLevelDto.price < 0) {
        throw new BadRequestException('价格必须是非负数');
      }
      if (typeof createVipLevelDto.duration !== 'number' || createVipLevelDto.duration <= 0) {
        throw new BadRequestException('有效期必须是正数');
      }
      if (!Array.isArray(createVipLevelDto.benefits) || createVipLevelDto.benefits.length === 0) {
        throw new BadRequestException('权益列表不能为空');
      }

      const vipLevel = this.vipLevelRepository.create({
        ...createVipLevelDto,
        isActive: createVipLevelDto.isActive ?? true,
        sort: createVipLevelDto.sort ?? 0
      });

      const savedVipLevel = await this.vipLevelRepository.save(vipLevel);
      this.logger.log(`VIP等级创建成功: ${savedVipLevel.id}`);
      
      return savedVipLevel;
    } catch (error) {
      this.logger.error(`创建VIP等级失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(query: PaginationDto) {
    try {
      this.logger.log(`获取VIP等级列表: ${JSON.stringify(query)}`);
      
      const [items, total] = await this.vipLevelRepository.findAndCount({
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        order: {
          sort: 'ASC',
          id: 'DESC',
        },
      });

      return {
        items,
        total,
      };
    } catch (error) {
      this.logger.error(`获取VIP等级列表失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      this.logger.log(`获取VIP等级详情: ${id}`);
      const vipLevel = await this.vipLevelRepository.findOneBy({ id });
      if (!vipLevel) {
        throw new BadRequestException(`ID为${id}的VIP等级不存在`);
      }
      return vipLevel;
    } catch (error) {
      this.logger.error(`获取VIP等级详情失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: number, updateVipLevelDto: UpdateVipLevelDto) {
    try {
      this.logger.log(`更新VIP等级: ${id}, ${JSON.stringify(updateVipLevelDto)}`);
      
      // 检查是否存在
      const existingVipLevel = await this.findOne(id);
      if (!existingVipLevel) {
        throw new BadRequestException(`ID为${id}的VIP等级不存在`);
      }

      const result = await this.vipLevelRepository.update(id, updateVipLevelDto);
      this.logger.log(`VIP等级更新成功: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`更新VIP等级失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      this.logger.log(`删除VIP等级: ${id}`);
      
      // 检查是否存在
      const existingVipLevel = await this.findOne(id);
      if (!existingVipLevel) {
        throw new BadRequestException(`ID为${id}的VIP等级不存在`);
      }

      const result = await this.vipLevelRepository.delete(id);
      this.logger.log(`VIP等级删除成功: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`删除VIP等级失败: ${error.message}`, error.stack);
      throw error;
    }
  }
} 