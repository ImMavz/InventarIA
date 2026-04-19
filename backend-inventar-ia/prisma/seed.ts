import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Borrando datos existentes...');
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log('Creando categorías...');
  const catElectronica = await prisma.category.create({
    data: { name: 'Electrónica' },
  });
  const catHogar = await prisma.category.create({
    data: { name: 'Hogar' },
  });

  console.log('Creando productos...');
  await prisma.product.createMany({
    data: [
      {
        name: 'Laptop Gamer Pro',
        description: 'Potente laptop para gaming y desarrollo',
        price: 1500.00,
        stock: 12,
        minStock: 5,
        categoryId: catElectronica.id,
      },
      {
        name: 'Monitor 4K',
        description: 'Monitor de 27 pulgadas para diseño',
        price: 400.00,
        stock: 3, // <--- Este está por debajo del minStock (5)
        minStock: 5,
        categoryId: catElectronica.id,
      },
      {
        name: 'Cafetera Express',
        description: 'Cafetera automática para oficina',
        price: 250.00,
        stock: 2, // <--- Este también está bajo
        minStock: 4,
        categoryId: catHogar.id,
      },
    ],
  });

  console.log('Seed finalizado con éxito 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });