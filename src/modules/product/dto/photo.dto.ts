import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ enum: ['product', 'service'] })
  @IsNotEmpty()
  @IsString()
  entityType: 'product' | 'service';

  @ApiProperty({ required: false })
  product?: string; // ID del producto al que pertenece la foto

  // @ApiProperty({ required: false })
  // service?: string; // ID del servicio al que pertenece la foto
}
