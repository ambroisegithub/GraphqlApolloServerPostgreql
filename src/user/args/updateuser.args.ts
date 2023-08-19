import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserArgs {
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
