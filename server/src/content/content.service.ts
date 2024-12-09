import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create(createContentDto: Partial<Content>): Promise<Content> {
    const content = new Content(createContentDto);
    return this.contentRepository.save(content);
  }

  async findAll(): Promise<Content[]> {
    return this.contentRepository.find({
      relations: ['author'],
    });
  }

  async findOne(id: number): Promise<Content | null> {
    return this.contentRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async update(id: number, updateContentDto: Partial<Content>): Promise<Content | null> {
    await this.contentRepository.update(id, updateContentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.contentRepository.delete(id);
  }

  async incrementDownloads(id: number): Promise<void> {
    await this.contentRepository.increment({ id }, 'downloads', 1);
  }

  async incrementViews(id: number): Promise<void> {
    await this.contentRepository.increment({ id }, 'views', 1);
  }
} 