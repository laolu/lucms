import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

interface UploadResponse {
  url: string;
}

@Controller('upload')
export class UploadController {
  private readonly uploadPath: string;

  constructor(private configService: ConfigService) {
    this.uploadPath = join(process.cwd(), 'uploads');
    // 确保上传目录存在
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          callback(null, join(process.cwd(), 'uploads'));
        },
        filename: (_req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        const ext = extname(file.originalname).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
          return callback(new BadRequestException('只允许上传图片文件!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<UploadResponse> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const baseUrl = this.configService.get<string>('APP_URL', 'http://localhost:8080');
    const url = `${baseUrl}/uploads/${file.filename}`;
    return { url };
  }
} 