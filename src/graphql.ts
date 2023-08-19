
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddUserArgs {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface UpdateUserArgs {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface IQuery {
    index(): string | Promise<string>;
    user(): User[] | Promise<User[]>;
    userById(userId: number): User | Promise<User>;
}

export interface IMutation {
    deleteUser(userId: number): string | Promise<string>;
    addUser(addUserArgs: AddUserArgs): string | Promise<string>;
    updateUser(updateUserArgs: UpdateUserArgs): string | Promise<string>;
}

type Nullable<T> = T | null;
