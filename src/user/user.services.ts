// user.service.ts

import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserArgs } from './args/adduser.args';
import { UpdateUserArgs } from './args/updateuser.args';
import { hashSync, compareSync } from 'bcrypt';

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
      throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await this.userRepo.remove(user);
    return 'Data has been deleted successfully';
  }

  async addUser(addUserArgs: AddUserArgs): Promise<string> {
    const existingUser = await this.userRepo.findOne({ where: { email: addUserArgs.email } });
    if (existingUser) {
      throw new HttpException('Email is already registered', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = new UserEntity();
    user.firstname = addUserArgs.firstname;
    user.lastname = addUserArgs.lastname;
    user.email = addUserArgs.email;
    user.password = hashSync(addUserArgs.password, 10); // Hash the password
    await this.userRepo.save(user);
    return 'User has been added successfully';
  }

  async updateUser(updateUserArgs: UpdateUserArgs): Promise<string> {
    const user: UserEntity = await this.userRepo.findOne({ where: { id: updateUserArgs.id } });
    if (!user) {
      throw new HttpException(`User with ID ${updateUserArgs.id} not found`, HttpStatus.NOT_FOUND);
    }
    user.firstname = updateUserArgs.firstname;
    user.lastname = updateUserArgs.lastname;
    user.email = updateUserArgs.email;
    user.password = hashSync(updateUserArgs.password, 10); // Hash the password
    await this.userRepo.save(user);
    return 'User has been updated successfully';
  }

  async loginUser(email: string, password: string): Promise<string> {
    const user: UserEntity = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }
    if (!compareSync(password, user.password)) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }
    return 'Login successful';
  }
}

