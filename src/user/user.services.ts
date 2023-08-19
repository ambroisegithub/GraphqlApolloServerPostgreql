import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserArgs } from './args/adduser.args';
import { UpdateUserArgs } from './args/updateuser.args';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepo: Repository<UserEntity>,
  ) {}

  async findAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepo.find();
    return users;
  }

  async findAllUserById(id: number): Promise<UserEntity | undefined> {
    const user = await this.userRepo.findOne({ where: { id: id } });
    return user;
  }

  async deleteUser(id: number): Promise<string> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    await this.userRepo.remove(user);
    return 'data has been deleted successfully';
  }

  async addUser(addUserArgs: AddUserArgs): Promise<string> {
    const user: UserEntity = new UserEntity();
    user.firstname = addUserArgs.firstname;
    user.lastname = addUserArgs.lastname;
    user.email = addUserArgs.email;
    user.password = addUserArgs.password;
    await this.userRepo.save(user);
    return 'User has been added Sucussefully';
  }

  async updateUser(updateUserArgs: UpdateUserArgs): Promise<string> {
    const user: UserEntity = await this.userRepo.findOne({
      where: { id: updateUserArgs.id },
    });
    user.firstname = updateUserArgs.firstname;
    user.lastname = updateUserArgs.lastname;
    user.email = updateUserArgs.email;
    user.password = updateUserArgs.password;
    await this.userRepo.save(user);
    return 'User has been updated Sucussefully';
  }
}
