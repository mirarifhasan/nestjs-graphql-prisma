import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/product.entity';

@ObjectType()
export class Category {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => [Product], { nullable: true })
  products?: Product[];
}
