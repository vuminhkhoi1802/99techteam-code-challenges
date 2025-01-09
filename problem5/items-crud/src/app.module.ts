import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dataSource from './config/data-source';
import { Item } from './items/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...dataSource.options,
      }),
    }),
    TypeOrmModule.forFeature([Item]),
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
