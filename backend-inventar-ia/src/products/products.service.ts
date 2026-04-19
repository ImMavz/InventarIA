import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        stock: createProductDto.stock,
        minStock: createProductDto.minStock,
        categoryId: createProductDto.categoryId, // Asegúrate de enviar un ID de categoría válido
      },
    });
  } 
  // ... los otros métodos
  findAll() {
    return this.prisma.product.findMany({
      include: { category: true }
    });
  }
  
  // Se añadirán los demas metodos despues.
}