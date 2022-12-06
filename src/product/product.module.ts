import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PrismaService } from 'src/prisma.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [forwardRef(() => CategoryModule)],
  providers: [ProductResolver, ProductService, PrismaService],
  exports: [ProductService],
})
export class ProductModule {}
