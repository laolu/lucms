import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { CreateContentAttributeDto } from './dto/content-attribute.dto';

@Injectable()
export class ContentAttributeService {
  constructor(
    @InjectRepository(ContentAttribute)
    private attributeRepository: Repository<ContentAttribute>,
    @InjectRepository(ContentAttributeValue)
    private attributeValueRepository: Repository<ContentAttributeValue>,
  ) {}

  async create(createDto: CreateContentAttributeDto): Promise<ContentAttribute> {
    const attribute = this.attributeRepository.create({
      name: createDto.name,
      type: createDto.type,
      sort: createDto.sort,
      isActive: createDto.isActive,
    });

    const savedAttribute = await this.attributeRepository.save(attribute);

    if (createDto.values && createDto.values.length > 0) {
      const values = createDto.values.map(valueDto => {
        return this.attributeValueRepository.create({
          ...valueDto,
          attribute: savedAttribute
        });
      });
      await this.attributeValueRepository.save(values);
    }

    return this.findOne(savedAttribute.id);
  }

  async findAll(): Promise<ContentAttribute[]> {
    return await this.attributeRepository.find({
      relations: ['values'],
      order: {
        sort: 'ASC',
        values: {
          sort: 'ASC'
        }
      }
    });
  }

  async findOne(id: number): Promise<ContentAttribute> {
    return await this.attributeRepository.findOne({
      where: { id },
      relations: ['values'],
      order: {
        values: {
          sort: 'ASC'
        }
      }
    });
  }

  async update(id: number, updateDto: Partial<CreateContentAttributeDto>): Promise<ContentAttribute> {
    const attribute = await this.findOne(id);
    
    if (updateDto.name) attribute.name = updateDto.name;
    if (updateDto.type) attribute.type = updateDto.type;
    if (typeof updateDto.sort !== 'undefined') attribute.sort = updateDto.sort;
    if (typeof updateDto.isActive !== 'undefined') attribute.isActive = updateDto.isActive;
    
    await this.attributeRepository.save(attribute);

    if (updateDto.values) {
      await this.attributeValueRepository.delete({ attribute: { id } });

      const values = updateDto.values.map(valueDto => {
        return this.attributeValueRepository.create({
          ...valueDto,
          attribute: { id }
        });
      });
      await this.attributeValueRepository.save(values);
    }

    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.attributeRepository.delete(id);
  }
} 