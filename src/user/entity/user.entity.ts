import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsNotEmpty()
  firstname: string;
  @Column()
  @IsNotEmpty()
  lastname: string;
  @Column()
  @IsEmail()
  email: string;
  @Column()
  @IsNotEmpty()
  password: string;
}
