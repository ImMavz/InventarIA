import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  // Método para crear un nuevo producto
  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        stock: createProductDto.stock,
        minStock: createProductDto.minStock,
        categoryId: createProductDto.categoryId,
      },
    });
  }
  // Método para obtener todos los productos, incluyendo su categoría 
  findAll() {
    return this.prisma.product.findMany({
      include: { category: true }
    });
  }
  // Método para eliminar un producto por su ID
  async remove(id: string) {
  return this.prisma.product.delete({
    where: { id },
  });
}
async updateStock(id: string, newStock: number) {
  return this.prisma.product.update({
    where: { id },
    data: {
      stock:
        newStock // Enviamos el numero final de stock, no un incremento o decremento, el backend se encargará de actualizarlo correctamente
    },
  });
}
  
  // Se añadirán los demas metodos despues.
}