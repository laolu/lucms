import { Controller, Get, Put, Body, Header } from '@nestjs/common';
import { SeoService } from './seo.service';
import { WebsiteSeo } from './entities/website-seo.entity';
import { WebsiteSeoDto } from './dto/website-seo.dto';

@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get('website')
  async getWebsiteSeo(): Promise<WebsiteSeo> {
    return this.seoService.getWebsiteSeo();
  }

  @Put('website')
  async updateWebsiteSeo(@Body() updateDto: WebsiteSeoDto): Promise<WebsiteSeo> {
    return this.seoService.updateWebsiteSeo(updateDto);
  }

  @Get('sitemap.xml')
  @Header('Content-Type', 'text/xml')
  async getSitemap(): Promise<string> {
    return this.seoService.generateSitemap();
  }

  @Get('robots.txt')
  @Header('Content-Type', 'text/plain')
  async getRobotsTxt(): Promise<string> {
    return this.seoService.generateRobotsTxt();
  }
} 