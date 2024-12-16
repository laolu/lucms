import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Content } from './entities/content.entity';
import { ContentCategory } from './entities/content-category.entity';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { ContentAttributeRelation } from './entities/content-attribute-relation.entity';
import { CategoryAttribute } from './entities/category-attribute.entity';
import { CategoryAttributeValue } from './entities/category-attribute-value.entity';
import { ContentCategoryController } from './content-category.controller';
import { ContentCategoryService } from './content-category.service';
import { ContentAttributeController } from './content-attribute.controller';
import { ContentAttributeService } from './content-attribute.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Content,
      ContentCategory,
      ContentAttribute,
      ContentAttributeValue,
      ContentAttributeRelation,
      CategoryAttribute,
      CategoryAttributeValue
    ])
  ],
  controllers: [ContentController, ContentCategoryController, ContentAttributeController],
  providers: [ContentService, ContentCategoryService, ContentAttributeService],
  exports: [ContentService, ContentCategoryService, ContentAttributeService]
})
export class ContentModule {} 