import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { phone } });
  }

  async findByPhoneOrEmail(phoneOrEmail: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: [
        { phone: phoneOrEmail },
        { email: phoneOrEmail }
      ]
    });
  }

  async findByVerificationToken(token: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { 
        verificationCode: token,
        verificationCodeExpiredAt: Like(new Date())
      }
    });
  }

  async findByResetPasswordToken(token: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { 
        resetPasswordToken: token,
        resetPasswordTokenExpiredAt: Like(new Date())
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // 检查用户名是否已存在
    if (updateUserDto.username) {
      const existingUser = await this.findByUsername(updateUserDto.username);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Username already exists');
      }
    }

    // 检查邮箱是否已存在
    if (updateUserDto.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    // 检查手机号是否已存在
    if (updateUserDto.phone) {
      const existingUser = await this.findByPhone(updateUserDto.phone);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Phone number already exists');
      }
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async verifyEmail(id: number): Promise<void> {
    await this.userRepository.update(id, {
      emailVerifiedAt: new Date()
    });
  }

  async verifyPhone(id: number): Promise<void> {
    await this.userRepository.update(id, {
      phoneVerifiedAt: new Date()
    });
  }

  async changePassword(id: number, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.findOne(id);

    // 验证旧密码
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // 更新新密码
    user.password = newPassword;
    await this.userRepository.save(user);
  }
} 