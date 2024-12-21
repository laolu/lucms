import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ContentModule } from './modules/content/content.module';
import { MailModule } from './modules/mail/mail.module';
import { SmsModule } from './modules/sms/sms.module';
import { VipModule } from './modules/vip/vip.module';
import { OrderModule } from './modules/order/order.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { loggerConfig } from './config/logger.config';
import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import { MenuModule } from './modules/menu/menu.module';
import dataSource from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule as SystemConfigModule } from './modules/config/config.module';
import { FriendLinkModule } from './modules/friend-link/friend-link.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [jwtConfig],
    }),
    WinstonModule.forRoot(loggerConfig),
    TypeOrmModule.forRoot(dataSource.options),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ContentModule,
    MailModule,
    SmsModule,
    VipModule,
    AdvertisementModule,
    SystemConfigModule,
    MenuModule,
    OrderModule,
    FriendLinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
} 