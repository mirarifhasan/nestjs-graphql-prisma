import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductModule } from 'src/product/product.module';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

@Module({
  imports: [forwardRef(() => ProductModule)],
  providers: [CategoryResolver, CategoryService, PrismaService],
  exports: [CategoryService],
})
export class CategoryModule {}
