import { StoreEntity } from 'src/modules/store/entities/store.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';
import { DiscountType } from '../enums/discountType.enum';

@Entity()
export class DiscountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  percentage: number;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: DiscountType,
  })
  discountType: DiscountType;

  // @OneToMany((type) => ProductEntity, (product) => product.discount, {
  //   nullable: true,
  // })
  // products: ProductEntity[];

  @OneToOne((type) => StoreEntity, { nullable: true })
  store: StoreEntity;
}
