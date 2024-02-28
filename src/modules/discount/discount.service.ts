import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from './entities/discount.entity';
import { Repository } from 'typeorm';
import { HttpStatus } from 'src/shared/enums/httpStatus.enum';
import { DiscountDto, UpdateDiscountDto } from './dto/discount.dto';
import { plainToClass } from 'class-transformer';
import { DiscountType } from './enums/discountType.enum';
import { StoreService } from '../store/store.service';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discountRepository: Repository<DiscountEntity>,
    private readonly storeService: StoreService,
  ) {}

  async create(discountDto: DiscountDto) {
    if (discountDto.discountType === DiscountType.STORE) {
      await this.storeService.findOne(discountDto.store);
    }
    const newDiscount = plainToClass(DiscountEntity, discountDto);
    return await this.discountRepository.save(newDiscount);
  }

  async findAll() {
    return await this.discountRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this.discountRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('Discount not found', HttpStatus.HTTP_400_BAD_REQUEST);
    }
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    const discountFound = await this.findOne(id);

    const updatedData = Object.assign(discountFound, updateDiscountDto);

    return await this.discountRepository.save(updatedData);
  }

  async remove(id: number) {
    const deleteResult = await this.discountRepository.delete({ id });
    if (deleteResult.affected === 0) {
      throw new HttpException('Discount not found', HttpStatus.HTTP_400_BAD_REQUEST);
    }
  }
}
