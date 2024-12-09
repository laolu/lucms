import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentAttribute } from './entities/content-attribute.entity';
import { CreateContentAttributeDto } from './dto/create-content-attribute.dto';

@Injectable()
export class ContentAttributeService {
  constructor(
    @InjectRepository(ContentAttribute)
    private attributeRepository: Repository<ContentAttribute>,
  ) {}

  async create(createAttributeDto: CreateContentAttributeDto): Promise<ContentAttribute> {
    const attribute = this.attributeRepository.create(createAttributeDto);
    return this.attributeRepository.save(attribute);
  }

  async findAll(): Promise<ContentAttribute[]> {
    return this.attributeRepository.find({
      order: { sort: 'ASC' },
    });
  }

  async findOne(id: number): Promise<ContentAttribute> {
    const attribute = await this.attributeRepository.findOne({
      where: { id },
    });
    if (!attribute) {
      throw new NotFoundException('属性不存在');
    }
    return attribute;
  }

  async update(id: number, updateAttributeDto: Partial<ContentAttribute>): Promise<ContentAttribute> {
    const attribute = await this.findOne(id);
    Object.assign(attribute, updateAttributeDto);
    return this.attributeRepository.save(attribute);
  }

  async remove(id: number): Promise<void> {
    const attribute = await this.findOne(id);
    await this.attributeRepository.remove(attribute);
  }

  async findActiveAttributes(): Promise<ContentAttribute[]> {
    return this.attributeRepository.find({
      where: { isActive: true },
      order: { sort: 'ASC' },
    });
  }
} 