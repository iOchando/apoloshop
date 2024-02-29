import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  HttpException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto, ProductDto, UpdateProductDto } from './dto/product.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { HttpStatus } from 'src/shared/enums/httpStatus.enum';
import { PhotoDto } from './dto/photo.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('FILES', files);
    if (files.length === 0) {
      throw new HttpException('Photos files are required.', HttpStatus.HTTP_400_BAD_REQUEST);
    }

    const photos: PhotoDto[] = files.map((photo) => ({ entityType: 'product', url: photo.filename }));

    const productDto: ProductDto = {
      ...createProductDto,
      photos: photos,
      original: Boolean(createProductDto.original),
      delivery: Boolean(createProductDto.delivery),
      nationalShipping: Boolean(createProductDto.nationalShipping),
    };

    return this.productService.create(productDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
