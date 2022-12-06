import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Category } from 'src/category/category.model';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @ResolveField((returns) => Category)
  category(@Parent() product: Product) {
    console.log('product', product);
    /*
    product {
      id: 1,
      name: 'Prod 1',
      description: 'demo description',
      price: 100,
      categoryId: 1
    }
    */

    return this.productService.getCategory(product['categoryId']);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  // @Mutation(() => Product)
  // updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
  //   return this.productService.update(updateProductInput.id, updateProductInput);
  // }

  // @Mutation(() => Product)
  // removeProduct(@Args('id', { type: () => Int }) id: number) {
  //   return this.productService.remove(id);
  // }
}
