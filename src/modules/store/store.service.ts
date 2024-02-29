import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { StoreEntity } from './entities/store.entity';
import { HttpStatus } from 'src/shared/enums/httpStatus.enum';
import { plainToClass } from 'class-transformer';
import { SocialNetworkEntity } from './entities/socialNetwork.entity';
import { StoreDto, UpdateStoreDto, CreateStoreDto } from './dto/store.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(storeDto: StoreDto) {
    await this.categoryService.findOne(storeDto.category);

    const newStore = plainToClass(StoreEntity, storeDto);

    return await this.storeRepository.save(newStore);
  }

  async findAll(): Promise<StoreEntity[]> {
    return await this.storeRepository.find({
      relations: ['category', 'socialNetworks'],
    });
  }

  async findOne(id: string) {
    try {
      return await this.storeRepository.findOne({
        where: { id },
        relations: ['category', 'socialNetworks'],
      });
    } catch (error) {
      throw new HttpException('Store not found', HttpStatus.HTTP_400_BAD_REQUEST);
    }
  }

  async findOneByUserId(userId: string) {
    try {
      return await this.storeRepository.findOne({
        where: { userId },
        relations: ['category', 'socialNetworks'],
      });
    } catch (error) {
      throw new HttpException('Store not found', HttpStatus.HTTP_400_BAD_REQUEST);
    }
  }

  async updateByUserId(userId: string, updateStoreDto: UpdateStoreDto) {
    const storeFound = await this.findOneByUserId(userId);

    const dataUpdate = {
      ...updateStoreDto,
      category: updateStoreDto.category
        ? await this.categoryService.findOne(updateStoreDto.category)
        : storeFound.category,
      socialNetworks: updateStoreDto.socialNetworks
        ? await Promise.all(
            updateStoreDto.socialNetworks.map(async (socialNetwork) => {
              const existingSocialNetwork = storeFound.socialNetworks.find(
                (sNetwork) => sNetwork.name === socialNetwork.name,
              );

              if (existingSocialNetwork) {
                return Object.assign(existingSocialNetwork, socialNetwork);
              } else {
                return plainToClass(SocialNetworkEntity, socialNetwork);
              }
            }),
          )
        : storeFound.socialNetworks,
    };

    const updatedData = Object.assign(storeFound, dataUpdate);

    return await this.storeRepository.save(updatedData);
  }

  async removeByUserId(userId: string): Promise<void> {
    const deleteResult = await this.storeRepository.delete({ userId });
    if (deleteResult.affected === 0) {
      throw new HttpException('Store not found', HttpStatus.HTTP_400_BAD_REQUEST);
    }
  }
}
