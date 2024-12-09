import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import { join } from 'path';

const logDir = 'logs';

export const loggerConfig: WinstonModuleOptions = {
  transports: [
    // 控制台日志
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    // 信息日志文件
    new winston.transports.File({
      filename: join(logDir, 'info.log'),
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    // 错误日志文件
    new winston.transports.File({
      filename: join(logDir, 'error.log'),
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
}; 