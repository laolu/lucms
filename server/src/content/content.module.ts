import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeService } from './content-attribute.service';
import { ContentAttributeController } from './content-attribute.controller';
import { ContentCategory } from './entities/content-category.entity';
import { ContentCategoryService } from './content-category.service';
import { ContentCategoryController } from './content-category.controller';
import { ContentComment } from './entities/content-comment.entity';
import { ContentCommentService } from './content-comment.service';
import { ContentCommentController } from './content-comment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Content,
      ContentAttribute,
      ContentCategory,
      ContentComment,
    ]),
  ],
  controllers: [
    ContentController,
    ContentAttributeController,
    ContentCategoryController,
    ContentCommentController,
  ],
  providers: [
    ContentService,
    ContentAttributeService,
    ContentCategoryService,
    ContentCommentService,
  ],
  exports: [ContentService],
})
export class ContentModule {} 