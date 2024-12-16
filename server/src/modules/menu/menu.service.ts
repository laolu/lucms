import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { MenuQueryDto } from './dto/menu-query.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>
  ) {}

  async findAll(query: MenuQueryDto = {}): Promise<Menu[]> {
    const { search, visible, parentId, sortBy, sort } = query;
    
    const where: any = {};
    if (search) {
      where.name = Like(`%${search}%`);
    }
    if (visible !== undefined) {
      where.visible = visible;
    }
    if (parentId !== undefined) {
      where.parentId = parentId;
    }

    const order: any = {};
    if (sortBy) {
      order[sortBy] = sort || 'ASC';
    } else {
      order.sort = 'ASC';
    }

    return this.menuRepository.find({
      where,
      order
    });
  }

  async findUserMenus(): Promise<Menu[]> {
    return this.menuRepository.find({
      where: {
        visible: true
      },
      order: {
        sort: 'ASC'
      }
    });
  }

  async findOne(id: number): Promise<Menu | null> {
    return this.menuRepository.findOne({ where: { id } });
  }

  async create(createMenuDto: Partial<Menu>): Promise<Menu> {
    const menu = this.menuRepository.create(createMenuDto);
    return this.menuRepository.save(menu);
  }

  async update(id: number, updateMenuDto: Partial<Menu>): Promise<Menu | null> {
    await this.menuRepository.update(id, updateMenuDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }
} 