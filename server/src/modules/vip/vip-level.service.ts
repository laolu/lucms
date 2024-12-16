import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VipLevel } from './entities/vip-level.entity';
import { CreateVipLevelDto } from './dto/create-vip-level.dto';
import { UpdateVipLevelDto } from './dto/update-vip-level.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@Injectable()
export class VipLevelService {
  constructor(
    @InjectRepository(VipLevel)
    private readonly vipLevelRepository: Repository<VipLevel>,
  ) {}

  async create(createVipLevelDto: CreateVipLevelDto) {
    const vipLevel = this.vipLevelRepository.create(createVipLevelDto);
    return await this.vipLevelRepository.save(vipLevel);
  }

  async findAll(query: PaginationDto) {
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
  }

  async findOne(id: number) {
    return await this.vipLevelRepository.findOneBy({ id });
  }

  async update(id: number, updateVipLevelDto: UpdateVipLevelDto) {
    return await this.vipLevelRepository.update(id, updateVipLevelDto);
  }

  async remove(id: number) {
    return await this.vipLevelRepository.delete(id);
  }
} 