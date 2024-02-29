import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'photos' })
export class PhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  url: string;

  @Column()
  entityType: 'product' | 'service';

  @ManyToOne((type) => ProductEntity, (product) => product.photos, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  product: ProductEntity;

  // @ManyToOne((type) => ServicioEntity, (service) => service.photos, {
  //   nullable: true,
  // })
  // service: ServicioEntity;
}
