import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ConditionProduct } from '../enums/conditionProduct.enum';
import { ExposureType } from '../enums/ExposureType.enum';
import { WarrantyType } from '../enums/warrantyType.enum';
import { PhotoDto } from './photo.dto';

export class ProductSchema {
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
  store: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsNotEmpty()
  availableQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ConditionProduct)
  condition: ConditionProduct;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(WarrantyType)
  warranty: WarrantyType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  warrantyPeriod: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ExposureType)
  exposureType: ExposureType;
}

export class ProductDto extends ProductSchema {
  @ApiProperty()
  @IsArray()
  photos: PhotoDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  delivery: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  nationalShipping: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  original: boolean;
}

export class CreateProductDto extends ProductSchema {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  original: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  delivery: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nationalShipping: string;
}

export class UpdateProductDto extends PartialType(ProductDto) {}
