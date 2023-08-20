// user.resolver.ts

import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './schema/user.schema';
import { UserService } from './user.services';
import { AddUserArgs } from './args/adduser.args';
import { UpdateUserArgs } from './args/updateuser.args';
import { HttpStatus, HttpException } from '@nestjs/common';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'user' })
  async getAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Query(() => User, { name: 'userById' })
  async getUserById(@Args('userId') id: number) {
    return await this.userService.findAllUserById(id);
  }

  @Mutation(() => String, { name: 'deleteUser' })
  async deleteUserById(@Args('userId') id: number) {
    const result = await this.userService.deleteUser(id);
    return result;
  }

  @Mutation(() => String, { name: 'addUser' })
  async addUser(@Args('addUserArgs') addUserArgs: AddUserArgs) {
    const result = await this.userService.addUser(addUserArgs);
    return result;
  }

  @Mutation(() => String, { name: 'updateUser' })
  async updateUser(@Args('updateUserArgs') updateUserArgs: UpdateUserArgs) {
    const result = await this.userService.updateUser(updateUserArgs);
    return result;
  }

  @Mutation(() => String, { name: 'loginUser' })
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    try {
      const result = await this.userService.loginUser(email, password);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
