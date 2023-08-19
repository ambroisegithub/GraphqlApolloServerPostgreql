import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './schema/user.schema';
import { UserService } from './user.services';
import { AddUserArgs } from './args/adduser.args';
import { UpdateUserArgs } from './args/updateuser.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'user' })
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Query(() => User, { name: 'userById' })
  getUserById(@Args('userId') id: number) {
    return this.userService.findAllUserById(id);
  }

  @Mutation(() => String, { name: 'deleteUser' })
  deleteUserById(@Args('userId') id: number) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => String, { name: 'addUser' })
  addUser(@Args('addUserArgs') addUserArgs: AddUserArgs) {
    return this.userService.addUser(addUserArgs);
  }

  @Mutation(() => String, { name: 'updateUser' })
  updateUser(@Args('updateUserArgs') updateUserArgs: UpdateUserArgs) {
    return this.userService.updateUser(updateUserArgs);
  }
}
