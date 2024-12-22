import { IsString, IsUrl, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateFriendLinkDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsUrl()
  logo?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  sort?: number;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}

export class UpdateFriendLinkDto extends CreateFriendLinkDto {} 