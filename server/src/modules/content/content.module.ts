import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModel } from './entities/content-model.entity';
import { ContentAttribute } from './entities/content-attribute.entity';
import { ContentAttributeValue } from './entities/content-attribute-value.entity';
import { ContentModelAttribute } from './entities/content-model-attribute.entity';
import { ContentModelAttributeValue } from './entities/content-model-attribute-value.entity';
import { ContentModelController } from './content-model.controller';
import { ContentModelService } from './content-model.service';
import { ContentAttributeController } from './content-attribute.controller';
import { ContentAttributeService } from './content-attribute.service';
import { ContentAttributeValueController } from './content-attribute-value.controller';
import { ContentAttributeValueService } from './content-attribute-value.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContentModel,
      ContentAttribute,
      ContentAttributeValue,
      ContentModelAttribute,
      ContentModelAttributeValue,
    ]),
  ],
  controllers: [
    ContentModelController,
    ContentAttributeController,
    ContentAttributeValueController,
  ],
  providers: [
    ContentModelService,
    ContentAttributeService,
    ContentAttributeValueService,
  ],
  exports: [
    ContentModelService,
    ContentAttributeService,
    ContentAttributeValueService,
  ],
})
export class ContentModule {} 