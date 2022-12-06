import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

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

  findAll() {
    return this.prisma.product.findMany({
      // include: {
      //   category: true,
      // },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id: Number(id) } });
  }

  // update(id: number, updateProductInput: UpdateProductInput) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
