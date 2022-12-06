import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Category } from './category.model';
import { CreateCategoryInput } from './dto/create-category-input.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategoryById(id: any): Promise<Category> {
    return this.prisma.category.findUnique({ where: { id: Number(id) } });
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<Category[]> {
    await this.prisma.category.create({
      data: createCategoryInput,
    });

    return this.findAll();
  }
}
