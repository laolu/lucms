import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>
  ) {}

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.find({
      order: {
        sort: 'ASC'
      }
    });
  }

  async findUserMenus(isAdmin: boolean): Promise<Menu[]> {
    const menus = await this.menuRepository.find({
      order: {
        sort: 'ASC'
      }
    });

    if (isAdmin) {
      return menus;
    }

    return menus.filter(menu => !menu.adminOnly);
  }

  async findOne(id: number): Promise<Menu> {
    return this.menuRepository.findOne({ where: { id } });
  }

  async create(createMenuDto: any): Promise<Menu> {
    const menu = this.menuRepository.create(createMenuDto);
    return this.menuRepository.save(menu);
  }

  async update(id: number, updateMenuDto: any): Promise<Menu> {
    await this.menuRepository.update(id, updateMenuDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }
} 