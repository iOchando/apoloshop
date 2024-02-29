import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { StoreModule } from './modules/store/store.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { ServiceModule } from './modules/service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_ORM,
      port: Number(process.env.PORT_ORM),
      username: process.env.USER_ORM,
      password: process.env.PASSWORD_ORM,
      database: process.env.DATABASE_ORM,
      entities: [__dirname + '/**/entities/*{.ts,.js}'],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    StoreModule,
    CategoryModule,
    ProductModule,
    TasksModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
