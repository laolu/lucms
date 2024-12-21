import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendLink } from './entities/friend-link.entity';
import { FriendLinkController } from './friend-link.controller';
import { FriendLinkService } from './friend-link.service';

@Module({
  imports: [TypeOrmModule.forFeature([FriendLink])],
  controllers: [FriendLinkController],
  providers: [FriendLinkService],
  exports: [FriendLinkService],
})
export class FriendLinkModule {} 