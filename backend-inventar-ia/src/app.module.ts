import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AiController } from './ai/ai.controller';
import { AiService } from './ai/ai.service';

@Module({
  imports: [PrismaModule, ProductsModule, CategoriesModule, ConfigModule.forRoot({
      isGlobal: true, 
    }),],
  controllers: [AppController, AiController],
  providers: [AppService, AiService],
})
export class AppModule {}
