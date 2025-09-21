import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ProductoModule } from './producto/producto.module';
import { ProductoEntity } from './producto/entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '117070', // Cambia esto por tu contraseña de MySQL
      database: 'productos_db',
      entities: [ProductoEntity],
      synchronize: true, // Solo para desarrollo - crea las tablas automáticamente
      logging: true, // Para ver las consultas SQL en consola
    }),
    UsuarioModule, 
    ProductoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
