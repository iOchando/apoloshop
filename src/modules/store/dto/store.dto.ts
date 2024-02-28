import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsArray,
  IsInstance,
  isObject,
  IsUUID,
} from 'class-validator';
import { StoreStatus } from '../enums/storeStatus.enum';
import { SocialNetworkDto } from './social-network.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class StoreSchema {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  category: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  website: string;

  @IsOptional()
  @IsBoolean()
  premium: boolean;

  @IsOptional()
  @IsEnum(StoreStatus)
  status: StoreStatus;
}

export class StoreDto extends StoreSchema {
  @ApiProperty()
  @IsArray()
  socialNetworks: SocialNetworkDto[];

  @ApiProperty()
  @IsString()
  logo: string;

  @ApiProperty()
  @IsString()
  banner: string;
}

export class CreateStoreDto extends StoreSchema {
  @ApiProperty()
  @IsString()
  socialNetworks: string;
}

export class PreUpdateStoreDto extends PartialType(CreateStoreDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  socialNetworks: string;
}

export class UpdateStoreDto extends PartialType(StoreDto) {}
