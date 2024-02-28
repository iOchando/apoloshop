import { HttpException, Injectable } from '@nestjs/common';
import { CategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { HttpStatus } from 'src/shared/enums/httpStatus.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.categoryRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        'Category not found',
        HttpStatus.HTTP_400_BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryFound = await this.findOne(id);

    const updatedData = Object.assign(categoryFound, updateCategoryDto);

    return await this.categoryRepository.save(updatedData);
  }

  async remove(id: string) {
    const deleteResult = await this.categoryRepository.delete({ id });
    if (deleteResult.affected === 0) {
      throw new HttpException(
        'Category not found',
        HttpStatus.HTTP_400_BAD_REQUEST,
      );
    }
  }
}
