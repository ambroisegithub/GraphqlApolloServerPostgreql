import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: number;
  @Field()
  firstname: string;
  @Field()
  lastname: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
