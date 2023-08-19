import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import * as dotenv from 'dotenv';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
dotenv.config();
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
