import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      name: 'LuCMS API',
      version: '1.0.0',
      description: 'A modern CMS system built with NestJS',
      documentation: '/docs',
      status: 'running',
      timestamp: new Date().toISOString(),
    };
  }
} 