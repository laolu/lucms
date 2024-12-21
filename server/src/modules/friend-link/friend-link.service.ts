import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendLink } from './entities/friend-link.entity';
import { CreateFriendLinkDto, UpdateFriendLinkDto } from './dto/friend-link.dto';

@Injectable()
export class FriendLinkService {
  constructor(
    @InjectRepository(FriendLink)
    private readonly friendLinkRepository: Repository<FriendLink>,
  ) {}

  async create(createDto: CreateFriendLinkDto): Promise<FriendLink> {
    const friendLink = this.friendLinkRepository.create(createDto);
    return await this.friendLinkRepository.save(friendLink);
  }

  async findAll(): Promise<FriendLink[]> {
    return await this.friendLinkRepository.find({
      order: {
        sort: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<FriendLink> {
    const friendLink = await this.friendLinkRepository.findOne({
      where: { id },
    });

    if (!friendLink) {
      throw new NotFoundException('友情链接不存在');
    }

    return friendLink;
  }

  async update(id: number, updateDto: UpdateFriendLinkDto): Promise<FriendLink> {
    const friendLink = await this.findOne(id);
    Object.assign(friendLink, updateDto);
    return await this.friendLinkRepository.save(friendLink);
  }

  async remove(id: number): Promise<void> {
    const friendLink = await this.findOne(id);
    await this.friendLinkRepository.remove(friendLink);
  }

  async toggleVisible(id: number): Promise<FriendLink> {
    const friendLink = await this.findOne(id);
    friendLink.visible = !friendLink.visible;
    return await this.friendLinkRepository.save(friendLink);
  }

  async updateSort(id: number, sort: number): Promise<FriendLink> {
    const friendLink = await this.findOne(id);
    friendLink.sort = sort;
    return await this.friendLinkRepository.save(friendLink);
  }
} 