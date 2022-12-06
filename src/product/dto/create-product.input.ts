import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int)
  price: number;

  @Field((type) => Int)
  categoryId: number;
}
