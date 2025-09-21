import { Body, Controller, Get, Post, Put, Delete, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto, UpdateProductoDto, Producto } from './dto/producto.dto';

@Controller('productos')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}

    // GET /productos - Obtener todos los productos
    @Get()
    async getProductos(): Promise<Producto[]> {
        return this.productoService.getProductos();
    }

    // GET /productos/:id - Obtener un producto por ID
    @Get(':id')
    async getProductoById(@Param('id', ParseIntPipe) id: number): Promise<Producto> {
        return this.productoService.getProductoById(id);
    }

    // POST /productos - Crear un nuevo producto
    @Post()
    async createProducto(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
        return this.productoService.createProducto(createProductoDto);
    }

    // PUT /productos/:id - Actualizar un producto
    @Put(':id')
    async updateProducto(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductoDto: UpdateProductoDto
    ): Promise<Producto> {
        return this.productoService.updateProducto(id, updateProductoDto);
    }

    // DELETE /productos/:id - Eliminar un producto
    @Delete(':id')
    async deleteProducto(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.productoService.deleteProducto(id);
    }

    // GET /productos/categoria/:categoria - Buscar por categoría
    @Get('categoria/:categoria')
    async getProductosByCategoria(@Param('categoria') categoria: string): Promise<Producto[]> {
        return this.productoService.getProductosByCategoria(categoria);
    }

    // GET /productos/buscar?q=termino - Buscar productos
    @Get('buscar')
    async buscarProductos(@Query('q') termino: string): Promise<Producto[]> {
        return this.productoService.buscarProductos(termino);
    }
}
