import { StoreEntity } from 'src/modules/store/entities/store.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entity';
import { ConditionProduct } from '../enums/conditionProduct.enum';
import { WarrantyType } from '../enums/warrantyType.enum';
import { PhotoEntity } from './photo.entity';
import { ExposureType } from '../enums/ExposureType.enum';
import { DiscountEntity } from '../../discount/entities/discount.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => StoreEntity, { onDelete: 'CASCADE' })
  store: StoreEntity;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne((type) => CategoryEntity)
  category: CategoryEntity;

  @Column()
  brand: string;

  @Column()
  original: boolean;

  @Column()
  availableQuantity: number;

  @Column()
  color: string;

  @Column({
    type: 'enum',
    enum: ConditionProduct,
  })
  condition: ConditionProduct;

  @Column({
    type: 'enum',
    enum: WarrantyType,
  })
  warranty: WarrantyType;

  @Column()
  warrantyPeriod: string;

  @Column()
  delivery: boolean;

  @Column()
  nationalShipping: boolean;

  @OneToMany((type) => PhotoEntity, (photo) => photo.product)
  photos: PhotoEntity[];

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne((type) => DiscountEntity, (discount) => discount.products)
  discount: DiscountEntity;

  @Column({
    type: 'enum',
    enum: ExposureType,
    default: ExposureType.FREE,
  })
  exposureType: ExposureType;
}
