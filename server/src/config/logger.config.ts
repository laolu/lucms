import { WinstonModuleOptions } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { join } from 'path';

export const loggerConfig: WinstonModuleOptions = {
  transports: [
    // 控制台输出
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('LuCMS', {
          prettyPrint: true,
        }),
      ),
    }),
    // 保存错误日志文件
    new winston.transports.File({
      level: 'error',
      filename: join(__dirname, '../../logs/error.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    // 保存所有日志文件
    new winston.transports.File({
      filename: join(__dirname, '../../logs/combined.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
}; 