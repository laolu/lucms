import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req): Promise<User> {
    return await this.usersService.findOne(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Put('profile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    // 普���用户不能修改自己的管理员状态
    delete updateUserDto.isAdmin;
    return await this.usersService.update(req.user.id, updateUserDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('id') id: number, @Request() req): Promise<void> {
    // 不能删除自己
    if (id === req.user.id) {
      throw new ForbiddenException('Cannot delete yourself');
    }
    await this.usersService.delete(id);
  }

  @Post('profile/change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Request() req,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string
  ): Promise<void> {
    await this.usersService.changePassword(req.user.id, oldPassword, newPassword);
  }

  @Post(':id/verify-email')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async verifyEmail(@Param('id') id: number): Promise<void> {
    await this.usersService.verifyEmail(id);
  }

  @Post(':id/verify-phone')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async verifyPhone(@Param('id') id: number): Promise<void> {
    await this.usersService.verifyPhone(id);
  }
} 