import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
  ) {}

  async getCategory(id: number) {
    return this.categoryService.getCategoryById(id);
  }

  async create(createProductInput: CreateProductInput) {
    console.log('createProductInput', createProductInput);

    let newProduct = await this.prisma.product.create({
      data: createProductInput,
    });

    return newProduct;
  }

  async findAll() {
    return this.prisma.product.findMany({
      // include: {
      //   category: true,
      // },
    });
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id: Number(id) } });
  }

  async findProductsByCategory(categoryId: number): Promise<any[]> {
    return this.prisma.product.findMany({
      where: {
        categoryId: Number(categoryId),
      },
    });
  }

  // update(id: number, updateProductInput: UpdateProductInput) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
