import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 实体
import { ContentModel } from './entities/content-model.entity';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { ContentModelAttribute } from './entities/content-model-attribute.entity';
import { ContentModelAttributeValue } from './entities/content-model-attribute-value.entity';
import { ContentCategory } from './entities/content-category.entity';
import { Content } from './entities/content.entity';
import { ContentAttributeRelation } from './entities/content-attribute-relation.entity';
import { ContentComment } from './entities/content-comment.entity';

// 控制器
import { ContentModelController } from './content-model.controller';
import { ContentAttributeController } from './content-attribute.controller';
import { ContentAttributeValueController } from './content-attribute-value.controller';
import { ContentCategoryController } from './content-category.controller';
import { ContentController } from './content.controller';
import { ContentCommentController } from './content-comment.controller';

// 服务
import { ContentModelService } from './content-model.service';
import { ContentAttributeService } from './content-attribute.service';
import { ContentAttributeValueService } from './content-attribute-value.service';
import { ContentCategoryService } from './content-category.service';
import { ContentService } from './content.service';
import { ContentCommentService } from './content-comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContentModel,
      ContentAttribute,
      ContentAttributeValue,
      ContentModelAttribute,
      ContentModelAttributeValue,
      ContentCategory,
      Content,
      ContentAttributeRelation,
      ContentComment,
    ]),
  ],
  controllers: [
    ContentModelController,
    ContentAttributeController,
    ContentAttributeValueController,
    ContentCategoryController,
    ContentController,
    ContentCommentController,
  ],
  providers: [
    ContentModelService,
    ContentAttributeService,
    ContentAttributeValueService,
    ContentCategoryService,
    ContentService,
    ContentCommentService,
  ],
  exports: [
    ContentModelService,
    ContentAttributeService,
    ContentAttributeValueService,
    ContentCategoryService,
    ContentService,
    ContentCommentService,
  ],
})
export class ContentModule {}