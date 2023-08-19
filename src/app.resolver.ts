import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  index(): string {
    return 'Nest Graphql Server';
  }
}
