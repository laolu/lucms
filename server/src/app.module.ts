import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ContentModule } from './modules/content/content.module';
import { ConfigModule } from './modules/config/config.module';
import { MailModule } from './modules/mail/mail.module';
import { SmsModule } from './modules/sms/sms.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { loggerConfig } from './config/logger.config';
import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import dataSource from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    WinstonModule.forRoot(loggerConfig),
    TypeOrmModule.forRoot(dataSource.options),
    AuthModule,
    UsersModule,
    ContentModule,
    ConfigModule,
    MailModule,
    SmsModule,
    AdvertisementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
} 