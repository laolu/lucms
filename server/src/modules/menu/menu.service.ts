import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = new Menu(createMenuDto);
    return this.menuRepository.save(menu);
  }

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.find({
      order: {
        sort: 'ASC',
      },
    });
  }

  async findAllTree(): Promise<Menu[]> {
    const allMenus = await this.findAll();
    return this.buildMenuTree(allMenus);
  }

  async findUserMenus(userRoles: UserRole[]): Promise<Menu[]> {
    const allMenus = await this.menuRepository.find({
      where: { visible: true },
      order: { sort: 'ASC' },
    });

    const userMenus = allMenus.filter(menu => {
      if (!menu.roles || menu.roles.length === 0) {
        return true;
      }
      return menu.roles.some(role => userRoles.includes(role as UserRole));
    });

    return this.buildMenuTree(userMenus);
  }

  async findOne(id: number): Promise<Menu | null> {
    return this.menuRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMenuDto: Partial<Menu>): Promise<Menu | null> {
    await this.menuRepository.update(id, updateMenuDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }

  private buildMenuTree(menus: Menu[], parentId: number | null = null): Menu[] {
    const tree: Menu[] = [];

    for (const menu of menus) {
      if (menu.parentId === parentId) {
        const children = this.buildMenuTree(menus, menu.id);
        if (children.length > 0) {
          menu.children = children;
        }
        tree.push(menu);
      }
    }

    return tree;
  }
} 