import { PartialType } from '@nestjs/mapped-types';
import { CreateVipLevelDto } from './create-vip-level.dto';

export class UpdateVipLevelDto extends PartialType(CreateVipLevelDto) {} 