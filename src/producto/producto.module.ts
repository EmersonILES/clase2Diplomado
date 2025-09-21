import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { ProductoEntity } from './entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntity])],
  controllers: [ProductoController],
  providers: [ProductoService]
})
export class ProductoModule {}
