import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateProductoDto, UpdateProductoDto, Producto } from './dto/producto.dto';
import { ProductoEntity } from './entities/producto.entity';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(ProductoEntity)
        private readonly productoRepository: Repository<ProductoEntity>
    ) {}

    // Obtener todos los productos
    async getProductos(): Promise<Producto[]> {
        return await this.productoRepository.find();
    }

    // Obtener un producto por ID
    async getProductoById(id: number): Promise<Producto> {
        const producto = await this.productoRepository.findOne({ where: { id } });
        if (!producto) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        return producto;
    }

    // Crear un nuevo producto
    async createProducto(createProductoDto: CreateProductoDto): Promise<Producto> {
        // Validaciones básicas
        if (!createProductoDto.nombre || createProductoDto.nombre.trim() === '') {
            throw new BadRequestException('El nombre del producto es requerido');
        }
        if (!createProductoDto.precio || createProductoDto.precio <= 0) {
            throw new BadRequestException('El precio debe ser mayor a 0');
        }
        if (createProductoDto.stock < 0) {
            throw new BadRequestException('El stock no puede ser negativo');
        }

        const nuevoProducto = this.productoRepository.create({
            nombre: createProductoDto.nombre.trim(),
            descripcion: createProductoDto.descripcion || '',
            precio: createProductoDto.precio,
            categoria: createProductoDto.categoria || 'General',
            stock: createProductoDto.stock || 0,
        });

        return await this.productoRepository.save(nuevoProducto);
    }

    // Actualizar un producto
    async updateProducto(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
        const producto = await this.getProductoById(id);

        // Validaciones
        if (updateProductoDto.precio !== undefined && updateProductoDto.precio <= 0) {
            throw new BadRequestException('El precio debe ser mayor a 0');
        }
        if (updateProductoDto.stock !== undefined && updateProductoDto.stock < 0) {
            throw new BadRequestException('El stock no puede ser negativo');
        }

        // Actualizar campos
        if (updateProductoDto.nombre !== undefined) {
            producto.nombre = updateProductoDto.nombre.trim();
        }
        if (updateProductoDto.descripcion !== undefined) {
            producto.descripcion = updateProductoDto.descripcion;
        }
        if (updateProductoDto.precio !== undefined) {
            producto.precio = updateProductoDto.precio;
        }
        if (updateProductoDto.categoria !== undefined) {
            producto.categoria = updateProductoDto.categoria;
        }
        if (updateProductoDto.stock !== undefined) {
            producto.stock = updateProductoDto.stock;
        }

        return await this.productoRepository.save(producto);
    }

    // Eliminar un producto
    async deleteProducto(id: number): Promise<{ message: string }> {
        const resultado = await this.productoRepository.delete(id);
        if (resultado.affected === 0) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        return { message: `Producto con ID ${id} eliminado exitosamente` };
    }

    // Buscar productos por categoría
    async getProductosByCategoria(categoria: string): Promise<Producto[]> {
        return await this.productoRepository.find({
            where: { categoria: Like(`%${categoria}%`) }
        });
    }

    // Buscar productos por nombre
    async buscarProductos(termino: string): Promise<Producto[]> {
        return await this.productoRepository.find({
            where: [
                { nombre: Like(`%${termino}%`) },
                { descripcion: Like(`%${termino}%`) }
            ]
        });
    }
}
