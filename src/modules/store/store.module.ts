import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './entities/store.entity';
import { SocialNetworkEntity } from './entities/socialNetwork.entity';
import { MulterConfigModule } from 'src/config/multer/multer-config.module';
import { CategoryEntity } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity, SocialNetworkEntity, CategoryEntity]), MulterConfigModule],
  controllers: [StoreController],
  providers: [StoreService, CategoryService],
})
export class StoreModule {}
