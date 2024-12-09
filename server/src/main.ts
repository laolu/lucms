import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as express from 'express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  // 确保日志目录存在
  const logDir = join(__dirname, '..', 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const app = await NestFactory.create(AppModule);
  
  // 使用 Winston 日志服务
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
  // 启用 CORS
  app.enableCors();
  
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  
  // 启用全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // 配置静态文件服务
  const uploadDir = join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  app.use('/uploads', express.static(uploadDir));
  
  // 配置全局前缀
  app.setGlobalPrefix('api');
  
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap(); 