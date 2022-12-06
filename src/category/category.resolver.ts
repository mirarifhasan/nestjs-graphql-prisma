import { forwardRef, Inject } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category-input.dto';

const pubSub = new PubSub();

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(
    private categoryService: CategoryService,
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
  ) {}

  @ResolveField((returns) => [Product])
  async products(@Parent() category: Category): Promise<Product[]> {
    console.log('category', category);
    // category { id: 1, name: 'Cat 1', description: 'This is description' }

    return this.productService.findProductsByCategory(category.id);
  }

  @Query((returns) => Category)
  async category(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Query((returns) => [Category])
  async categories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Mutation((returns) => [Category])
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category[]> {
    let categories = await this.categoryService.createCategory(
      createCategoryInput,
    );
    pubSub.publish('categories', { subscribe_to_get_categories: categories });
    return categories;
  }

  @Subscription((returns) => [Category], {
    name: 'subscribe_to_get_categories',
  })
  categoriesSubscription(): AsyncIterator<Category[]> {
    return pubSub.asyncIterator('categories');
  }
}
