import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebsiteSeo } from './entities/website-seo.entity';
import { WebsiteSeoDto } from './dto/website-seo.dto';

@Injectable()
export class SeoService {
  constructor(
    @InjectRepository(WebsiteSeo)
    private websiteSeoRepository: Repository<WebsiteSeo>,
  ) {}

  async getWebsiteSeo(): Promise<WebsiteSeo> {
    const seo = await this.websiteSeoRepository.findOne({
      where: { id: 1 },
    });
    if (!seo) {
      // 如果不存在，创建默认配置
      const defaultSeo = this.websiteSeoRepository.create({
        siteName: '默认网站名称',
      });
      return this.websiteSeoRepository.save(defaultSeo);
    }
    return seo;
  }

  async updateWebsiteSeo(updateDto: WebsiteSeoDto): Promise<WebsiteSeo> {
    let seo = await this.getWebsiteSeo();
    Object.assign(seo, updateDto);
    return this.websiteSeoRepository.save(seo);
  }

  async generateSitemap(): Promise<string> {
    // TODO: 实现站点地图生成逻辑
    return '';
  }

  async generateRobotsTxt(): Promise<string> {
    const seo = await this.getWebsiteSeo();
    if (seo.robotsTxt) {
      return seo.robotsTxt;
    }
    
    // 生成默认的robots.txt
    return `User-agent: *\nAllow: /\nSitemap: ${process.env.WEBSITE_URL}/sitemap.xml`;
  }
} 