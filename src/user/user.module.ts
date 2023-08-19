import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.services';
import { UserResolver } from './use.Resolver';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [UserService, UserResolver],
})
export class UserModule {}
