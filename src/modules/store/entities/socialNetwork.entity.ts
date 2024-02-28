import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity({ name: 'social_networks' })
export class SocialNetworkEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  username: string;

  @ManyToOne(() => StoreEntity, { onDelete: 'CASCADE' })
  store: StoreEntity;
}
