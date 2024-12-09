import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContentModule } from './content/content.module';
import { ConfigModule } from './config/config.module';
import { MailModule } from './mail/mail.module';
import { SmsModule } from './sms/sms.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { loggerConfig } from './config/logger.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot(loggerConfig),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'mycms',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ContentModule,
    ConfigModule,
    MailModule,
    SmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
} 