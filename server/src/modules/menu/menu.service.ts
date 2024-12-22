import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuQueryDto } from './dto/menu-query.dto';
import { ContentCategoryService } from '../content/content-category.service';
import { ContentCategory } from '../content/entities/content-category.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    private readonly contentCategoryService: ContentCategoryService,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = this.menuRepository.create(createMenuDto);
    return await this.menuRepository.save(menu);
  }

  async findAll(query: MenuQueryDto): Promise<Menu[]> {
    const { search, parentId, visible, sortBy = 'sort', sort = 'ASC' } = query;
    
    const qb = this.menuRepository.createQueryBuilder('menu')
      .leftJoinAndSelect('menu.parent', 'parent');

    if (search) {
      qb.andWhere('menu.name LIKE :search', { search: `%${search}%` });
    }

    if (parentId !== undefined) {
      qb.andWhere('menu.parentId = :parentId', { parentId });
    }

    if (visible !== undefined) {
      qb.andWhere('menu.visible = :visible', { visible });
    }

    qb.orderBy(`menu.${sortBy}`, sort);

    return await qb.getMany();
  }

  async findOne(id: number): Promise<Menu> {
    return await this.menuRepository.findOne({
      where: { id },
      relations: ['parent']
    });
  }

  async update(id: number, updateMenuDto: Partial<CreateMenuDto>): Promise<Menu> {
    await this.menuRepository.update(id, updateMenuDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }

  async importCategories(): Promise<void> {
    // 获取所有内容分类
    const categories = await this.contentCategoryService.findAll();
    
    // 创建一个映射来存储分类ID到菜单ID的对应关系
    const categoryMenuMap = new Map<number, number>();

    // 第一步：创建所有菜单项
    for (const category of categories) {
      const menuData: CreateMenuDto = {
        name: category.name,
        path: `/category/${category.id}`,
        visible: true,
        sort: category.sort,
        // 暂时不设置parentId，等所有菜单都创建完后再更新
        parentId: undefined
      };
      
      const menu = await this.create(menuData);
      // 保存分类ID和对应的菜单ID
      categoryMenuMap.set(category.id, menu.id);
    }

    // 第二步：更新所有菜单的父子关系
    for (const category of categories) {
      if (category.parentId) {
        const menuId = categoryMenuMap.get(category.id);
        const parentMenuId = categoryMenuMap.get(category.parentId);
        
        if (menuId && parentMenuId) {
          await this.update(menuId, {
            parentId: parentMenuId
          });
        }
      }
    }
  }

  async getTree(): Promise<Menu[]> {
    // 使用 QueryBuilder 加载所有菜单及其关系
    const menus = await this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.children', 'children')
      .leftJoinAndSelect('children.children', 'grandChildren')
      .leftJoinAndSelect('grandChildren.children', 'greatGrandChildren')
      .where('menu.parentId IS NULL')
      .orderBy('menu.sort', 'ASC')
      .addOrderBy('children.sort', 'ASC')
      .addOrderBy('grandChildren.sort', 'ASC')
      .addOrderBy('greatGrandChildren.sort', 'ASC')
      .getMany();

    return menus;
  }
} 