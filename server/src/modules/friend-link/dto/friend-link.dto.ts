import { IsString, IsUrl, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendLinkDto {
  @ApiProperty({ description: '友情链接名称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '友情链接URL' })
  @IsUrl()
  url: string;

  @ApiProperty({ description: '友情链接Logo', required: false })
  @IsOptional()
  @IsUrl()
  logo?: string;

  @ApiProperty({ description: '友情链接描述', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: '排序', required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  sort?: number;

  @ApiProperty({ description: '是否显示', required: false, default: true })
  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}

export class UpdateFriendLinkDto extends CreateFriendLinkDto {} 