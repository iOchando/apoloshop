import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { DiscountType } from '../enums/discountType.enum';
import { ProductDto } from 'src/modules/product/dto/product.dto';
import { StoreDto } from 'src/modules/store/dto/store.dto';

export class DiscountSchema {
  @ApiProperty()
  @IsNotEmpty()
  percentage: number;

  @ApiProperty()
  @IsOptional()
  startDate: Date;

  @ApiProperty()
  @IsOptional()
  endDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @ApiProperty()
  @IsOptional()
  store?: string;
}

export class DiscountDto extends DiscountSchema {
  @ApiProperty()
  @IsOptional()
  products?: ProductDto[];
}

export class CreateDiscountDto extends DiscountSchema {
  @ApiProperty()
  @IsOptional()
  products?: string[];
}

export class PreUpdateDiscountDto extends PartialType(CreateDiscountDto) {}

export class UpdateDiscountDto extends PartialType(DiscountDto) {}
