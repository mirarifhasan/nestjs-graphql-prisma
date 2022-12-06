import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/category/category.model';

@ObjectType()
export class Product {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int)
  price: number;

  @Field((type) => Category, { nullable: true })
  category: Category;
}
