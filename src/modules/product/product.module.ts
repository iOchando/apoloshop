import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { PhotoEntity } from './entities/photo.entity';
import { MulterConfigModule } from 'src/config/multer/multer-config.module';
import { StoreService } from '../store/store.service';
import { CategoryService } from '../category/category.service';
import { StoreEntity } from '../store/entities/store.entity';
import { CategoryEntity } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, PhotoEntity, StoreEntity, CategoryEntity]), MulterConfigModule],
  controllers: [ProductController],
  providers: [ProductService, StoreService, CategoryService],
})
export class ProductModule {}
