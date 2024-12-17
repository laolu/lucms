import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';

@Injectable()
export class ContentAttributeValueService {
  constructor(
    @InjectRepository(ContentAttributeValue)
    private readonly repository: Repository<ContentAttributeValue>,
  ) {}

  async findAll() {
    return this.repository.find({
      order: {
        sort: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(`属性值 ${id} 不存在`);
    }

    return entity;
  }

  async create(createDto: any) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async update(id: number, updateDto: any) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    return this.repository.remove(entity);
  }
} 