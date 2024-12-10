import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { User } from '../modules/users/entities/user.entity';
import { Content } from '../modules/content/entities/content.entity';
import { ContentCategory } from '../modules/content/entities/content-category.entity';
import { ContentAttribute } from '../modules/content/entities/content-attribute.entity';
import { ContentAttributeValue } from '../modules/content/entities/content-attribute-value.entity';
import { ContentAttributeRelation } from '../modules/content/entities/content-attribute-relation.entity';
import { ContentComment } from '../modules/content/entities/content-comment.entity';
import { CategoryAttribute } from '../modules/content/entities/category-attribute.entity';
import { CategoryAttributeValue } from '../modules/content/entities/category-attribute-value.entity';
import { Menu } from '../modules/menu/entities/menu.entity';
import { VipLevel } from '../modules/vip/entities/vip-level.entity';
import { VipOrder } from '../modules/vip/entities/vip-order.entity';
import { Advertisement } from '../modules/advertisement/entities/advertisement.entity';
import { SmsLog } from '../modules/sms/entities/sms-log.entity';
import { SystemConfig } from '../modules/config/entities/system-config.entity';

config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'lucms',
  entities: [
    User,
    Content,
    ContentCategory,
    ContentAttribute,
    ContentAttributeValue,
    ContentAttributeRelation,
    ContentComment,
    CategoryAttribute,
    CategoryAttributeValue,
    Menu,
    VipLevel,
    VipOrder,
    SystemConfig,
    Advertisement,
    SmsLog
  ],
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: process.env.APP_ENV === 'development',
});

export default dataSource; 