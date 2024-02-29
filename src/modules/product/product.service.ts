import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto, ProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpStatus } from 'src/shared/enums/httpStatus.enum';
import { StoreService } from '../store/store.service';
import { CategoryService } from '../category/category.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly storeService: StoreService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(productDto: ProductDto) {
    await this.storeService.findOne(productDto.store);

    await this.categoryService.findOne(productDto.category);

    const newProduct = plainToClass(ProductEntity, productDto);

    console.log(newProduct);

    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      relations: ['category', 'photos', 'store'],
    });
  }

  async findOne(id: string) {
    try {
      return await this.productRepository.findOne({
        where: { id },
        relations: ['category', 'photos'],
      });
    } catch (error) {
      throw new HttpException('Product not found', HttpStatus.HTTP_400_BAD_REQUEST);
    }
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
