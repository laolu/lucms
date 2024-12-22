import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { FriendLinkService } from './friend-link.service';
import { CreateFriendLinkDto, UpdateFriendLinkDto } from './dto/friend-link.dto';
import { FriendLink } from './entities/friend-link.entity';

@Controller('friend-links')
export class FriendLinkController {
  constructor(private readonly friendLinkService: FriendLinkService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createDto: CreateFriendLinkDto): Promise<FriendLink> {
    return await this.friendLinkService.create(createDto);
  }

  @Get()
  async findAll(): Promise<FriendLink[]> {
    return await this.friendLinkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FriendLink> {
    return await this.friendLinkService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateFriendLinkDto,
  ): Promise<FriendLink> {
    return await this.friendLinkService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async remove(@Param('id') id: number): Promise<void> {
    await this.friendLinkService.remove(id);
  }

  @Patch(':id/toggle-visible')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async toggleVisible(@Param('id') id: number): Promise<FriendLink> {
    return await this.friendLinkService.toggleVisible(id);
  }

  @Patch(':id/sort')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async updateSort(
    @Param('id') id: number,
    @Body('sort') sort: number,
  ): Promise<FriendLink> {
    return await this.friendLinkService.updateSort(id, sort);
  }
} 