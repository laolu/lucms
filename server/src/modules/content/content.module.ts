import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { ContentAttributeRelation } from './entities/content-attribute-relation.entity';
import { Content } from './entities/content.entity';
import { ContentCategory } from './entities/content-category.entity';
import { ContentComment } from './entities/content-comment.entity';
import { ContentAttributeController } from './content-attribute.controller';
import { ContentAttributeService } from './content-attribute.service';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentCategoryController } from './content-category.controller';
import { ContentCategoryService } from './content-category.service';
import { ContentCommentController } from './content-comment.controller';
import { ContentCommentService } from './content-comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContentAttribute,
      ContentAttributeValue,
      ContentAttributeRelation,
      Content,
      ContentCategory,
      ContentComment
    ])
  ],
  controllers: [
    ContentAttributeController,
    ContentController,
    ContentCategoryController,
    ContentCommentController
  ],
  providers: [
    ContentAttributeService,
    ContentService,
    ContentCategoryService,
    ContentCommentService
  ],
  exports: [
    ContentAttributeService,
    ContentService,
    ContentCategoryService,
    ContentCommentService
  ],
})
export class ContentModule {} 