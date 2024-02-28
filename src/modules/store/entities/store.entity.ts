import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entity';
import { SocialNetworkEntity } from './socialNetwork.entity';
import { StoreStatus } from '../enums/storeStatus.enum';
import { DiscountEntity } from 'src/modules/discount/entities/discount.entity';

@Entity({ name: 'stores' })
export class StoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  userId: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  description: string;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  country: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: false,
  })
  logo: string;

  @Column({
    nullable: false,
  })
  banner: string;

  @Column({
    nullable: false,
  })
  website: string;

  @Column({
    nullable: false,
    default: false,
  })
  premium: boolean;

  @Column({
    type: 'enum',
    enum: StoreStatus,
    default: StoreStatus.PENDING,
  })
  status: StoreStatus;

  @OneToMany(() => SocialNetworkEntity, (socialNetwork) => socialNetwork.store, {
    cascade: true,
  })
  socialNetworks: SocialNetworkEntity[];

  @OneToOne((type) => DiscountEntity, { nullable: true })
  discount: DiscountEntity;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
