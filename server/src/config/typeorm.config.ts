import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Content } from '../content/entities/content.entity';
import { ContentCategory } from '../content/entities/content-category.entity';
import { ContentAttribute } from '../content/entities/content-attribute.entity';
import { ContentComment } from '../content/entities/content-comment.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Seo } from '../seo/entities/seo.entity';
import { WebsiteSeo } from '../seo/entities/website-seo.entity';
import { VipLevel } from '../vip/entities/vip-level.entity';
import { VipOrder } from '../vip/entities/vip-order.entity';
import { SystemConfig } from './entities/system-config.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [
    User,
    Content,
    ContentCategory,
    ContentAttribute,
    ContentComment,
    Menu,
    Seo,
    WebsiteSeo,
    VipLevel,
    VipOrder,
    SystemConfig
  ],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
}); 