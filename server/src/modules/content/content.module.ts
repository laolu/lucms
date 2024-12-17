import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Content } from './entities/content.entity';
import { ContentCategory } from './entities/content-category.entity';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { ContentAttributeRelation } from './entities/content-attribute-relation.entity';
import { ContentModel } from './entities/content-model.entity';
import { ContentCategoryController } from './content-category.controller';
import { ContentCategoryService } from './content-category.service';
import { ContentAttributeController } from './content-attribute.controller';
import { ContentAttributeService } from './content-attribute.service';
import { ContentModelController } from './content-model.controller';
import { ContentModelService } from './content-model.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Content,
      ContentCategory,
      ContentAttribute,
      ContentAttributeValue,
      ContentAttributeRelation,
      ContentModel
    ])
  ],
  controllers: [
    ContentController, 
    ContentCategoryController, 
    ContentAttributeController,
    ContentModelController
  ],
  providers: [
    ContentService, 
    ContentCategoryService, 
    ContentAttributeService,
    ContentModelService
  ],
  exports: [
    ContentService, 
    ContentCategoryService, 
    ContentAttributeService,
    ContentModelService
  ]
})
export class ContentModule {} 