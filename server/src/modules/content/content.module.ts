import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentCategory } from './entities/content-category.entity';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { CategoryAttribute } from './entities/category-attribute.entity';
import { CategoryAttributeValue } from './entities/category-attribute-value.entity';
import { ContentCategoryController } from './content-category.controller';
import { ContentCategoryService } from './content-category.service';
import { ContentAttributeController } from './content-attribute.controller';
import { ContentAttributeService } from './content-attribute.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContentCategory,
      ContentAttribute,
      ContentAttributeValue,
      CategoryAttribute,
      CategoryAttributeValue
    ])
  ],
  controllers: [ContentCategoryController, ContentAttributeController],
  providers: [ContentCategoryService, ContentAttributeService],
  exports: [ContentCategoryService, ContentAttributeService]
})
export class ContentModule {} 