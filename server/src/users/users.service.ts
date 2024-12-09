import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 检查是否提供了手机号或邮箱
    if (!createUserDto.phone && !createUserDto.email) {
      throw new BadRequestException('必须提供手机号或邮箱地址');
    }

    // 检查手机号是否已存在
    if (createUserDto.phone) {
      const existingPhone = await this.findByPhone(createUserDto.phone);
      if (existingPhone) {
        throw new BadRequestException('手机号已被注册');
      }
    }

    // 检查邮箱是否已存在
    if (createUserDto.email) {
      const existingEmail = await this.findByEmail(createUserDto.email);
      if (existingEmail) {
        throw new BadRequestException('邮箱已被注册');
      }
    }

    const user = new User(createUserDto);
    user.password = await bcrypt.hash(user.password, 10);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { phone } });
  }

  async findByPhoneOrEmail(phoneOrEmail: string): Promise<User | null> {
    // 判断是手机号还是邮箱
    const isEmail = phoneOrEmail.includes('@');
    if (isEmail) {
      return this.findByEmail(phoneOrEmail);
    } else {
      return this.findByPhone(phoneOrEmail);
    }
  }

  async findByResetPasswordToken(token: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { resetPasswordToken: token },
    });
  }

  async findByVerificationToken(token: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { verificationCode: token },
    });
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
} 