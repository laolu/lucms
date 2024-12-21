import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { FriendLinkService } from './friend-link.service';
import { CreateFriendLinkDto, UpdateFriendLinkDto } from './dto/friend-link.dto';
import { FriendLink } from './entities/friend-link.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('友情链接')
@Controller('friend-links')
export class FriendLinkController {
  constructor(private readonly friendLinkService: FriendLinkService) {}

  @Post()
  @ApiOperation({ summary: '创建友情链接' })
  @ApiResponse({ status: 201, description: '创建成功', type: FriendLink })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createDto: CreateFriendLinkDto): Promise<FriendLink> {
    return await this.friendLinkService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有友情链接' })
  @ApiResponse({ status: 200, description: '获取成功', type: [FriendLink] })
  async findAll(): Promise<FriendLink[]> {
    return await this.friendLinkService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定友情链接' })
  @ApiParam({ name: 'id', description: '友情链接ID' })
  @ApiResponse({ status: 200, description: '获取成功', type: FriendLink })
  async findOne(@Param('id') id: number): Promise<FriendLink> {
    return await this.friendLinkService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新友情链接' })
  @ApiParam({ name: 'id', description: '友情链接ID' })
  @ApiResponse({ status: 200, description: '更新成功', type: FriendLink })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateFriendLinkDto,
  ): Promise<FriendLink> {
    return await this.friendLinkService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除友情链接' })
  @ApiParam({ name: 'id', description: '友情链接ID' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 401, description: '��授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async remove(@Param('id') id: number): Promise<void> {
    await this.friendLinkService.remove(id);
  }

  @Patch(':id/toggle-visible')
  @ApiOperation({ summary: '切换友情链接显示状态' })
  @ApiParam({ name: 'id', description: '友情链接ID' })
  @ApiResponse({ status: 200, description: '状态切换成功', type: FriendLink })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async toggleVisible(@Param('id') id: number): Promise<FriendLink> {
    return await this.friendLinkService.toggleVisible(id);
  }

  @Patch(':id/sort')
  @ApiOperation({ summary: '更新友情链接排序' })
  @ApiParam({ name: 'id', description: '友情链接ID' })
  @ApiResponse({ status: 200, description: '排序更新成功', type: FriendLink })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async updateSort(
    @Param('id') id: number,
    @Body('sort') sort: number,
  ): Promise<FriendLink> {
    return await this.friendLinkService.updateSort(id, sort);
  }
} 