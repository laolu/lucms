import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeoController } from './seo.controller';
import { SeoService } from './seo.service';
import { WebsiteSeo } from './entities/website-seo.entity';
import { Seo } from './entities/seo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WebsiteSeo, Seo])],
  controllers: [SeoController],
  providers: [SeoService],
  exports: [SeoService],
})
export class SeoModule {} 