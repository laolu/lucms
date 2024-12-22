import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Advertisement } from './entities/advertisement.entity';
import { AdContent } from './entities/ad-content.entity';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { AdPosition } from '../../common/enums/ad-position.enum';

export interface AdListResponse {
  items: Advertisement[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementRepository: Repository<Advertisement>,
    @InjectRepository(AdContent)
    private adContentRepository: Repository<AdContent>,
  ) {}

  async create(createAdvertisementDto: CreateAdvertisementDto): Promise<Advertisement> {
    const advertisement = this.advertisementRepository.create({
      title: createAdvertisementDto.title,
      type: createAdvertisementDto.type,
      position: createAdvertisementDto.position,
      isActive: createAdvertisementDto.isActive ?? true,
      startDate: createAdvertisementDto.startDate,
      endDate: createAdvertisementDto.endDate,
      order: createAdvertisementDto.order ?? 0,
    });

    const savedAd = await this.advertisementRepository.save(advertisement);

    const contents = createAdvertisementDto.contents.map(content => {
      const adContent = this.adContentRepository.create({
        ...content,
        advertisement: savedAd,
      });
      return adContent;
    });

    await this.adContentRepository.save(contents);

    return this.advertisementRepository.findOne({
      where: { id: savedAd.id },
      relations: ['contents'],
    });
  }

  async findAll(query?: {
    position?: AdPosition;
    isActive?: boolean;
    search?: string;
    sortBy?: string;
    sort?: 'ASC' | 'DESC';
    page?: number;
    pageSize?: number;
  }): Promise<AdListResponse> {
    const {
      position,
      isActive,
      search,
      sortBy = 'order',
      sort = 'ASC',
      page = 1,
      pageSize = 10,
    } = query || {};

    const queryBuilder = this.advertisementRepository
      .createQueryBuilder('ad')
      .leftJoinAndSelect('ad.contents', 'contents');

    if (position) {
      queryBuilder.andWhere('ad.position = :position', { position });
    }

    if (typeof isActive === 'boolean') {
      queryBuilder.andWhere('ad.isActive = :isActive', { isActive });
    }

    if (search) {
      queryBuilder.andWhere('ad.title LIKE :search', { search: `%${search}%` });
    }

    const total = await queryBuilder.getCount();
    const totalPages = Math.ceil(total / pageSize);

    queryBuilder
      .orderBy(`ad.${sortBy}`, sort)
      .addOrderBy('ad.createdAt', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const items = await queryBuilder.getMany();

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  async findByPosition(position: AdPosition): Promise<Advertisement[]> {
    return await this.advertisementRepository.find({
      where: {
        position,
        isActive: true,
      },
      relations: ['contents'],
      order: {
        order: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Advertisement | null> {
    return await this.advertisementRepository.findOne({
      where: { id },
      relations: ['contents'],
    });
  }

  async update(id: number, updateData: Partial<Advertisement>): Promise<Advertisement> {
    const advertisement = await this.advertisementRepository.findOne({
      where: { id },
      relations: ['contents'],
    });

    if (!advertisement) {
      throw new Error('广告不存在');
    }

    // 更新广告基本信息
    Object.assign(advertisement, {
      title: updateData.title,
      type: updateData.type,
      position: updateData.position,
      isActive: updateData.isActive,
      startDate: updateData.startDate,
      endDate: updateData.endDate,
      order: updateData.order,
    });

    // 保存广告基本信息
    await this.advertisementRepository.save(advertisement);

    // 如果有更新内容
    if (updateData.contents) {
      // 删除旧的内容
      await this.adContentRepository.delete({ advertisement: { id } });

      // 创建新的内容
      const contents = updateData.contents.map(content => {
        const adContent = this.adContentRepository.create({
          ...content,
          advertisement,
        });
        return adContent;
      });

      await this.adContentRepository.save(contents);
    }

    return this.advertisementRepository.findOne({
      where: { id },
      relations: ['contents'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.advertisementRepository.delete(id);
  }
} 