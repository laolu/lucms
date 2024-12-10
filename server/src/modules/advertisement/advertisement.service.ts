import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertisement } from './entities/advertisement.entity';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { AdPosition } from '../../common/enums/ad-position.enum';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementRepository: Repository<Advertisement>,
  ) {}

  async create(createAdvertisementDto: CreateAdvertisementDto): Promise<Advertisement> {
    const advertisement = this.advertisementRepository.create(createAdvertisementDto);
    return await this.advertisementRepository.save(advertisement);
  }

  async findAll(): Promise<Advertisement[]> {
    return await this.advertisementRepository.find({
      order: {
        order: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async findByPosition(position: AdPosition): Promise<Advertisement[]> {
    return await this.advertisementRepository.find({
      where: {
        position,
        isActive: true,
      },
      order: {
        order: 'ASC',
      },
    });
  }

  async update(id: number, updateData: Partial<Advertisement>): Promise<Advertisement> {
    await this.advertisementRepository.update(id, updateData);
    return await this.advertisementRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.advertisementRepository.delete(id);
  }
} 