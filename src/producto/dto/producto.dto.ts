export interface CreateProductoDto {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
}

export interface UpdateProductoDto {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  categoria?: string;
  stock?: number;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}
