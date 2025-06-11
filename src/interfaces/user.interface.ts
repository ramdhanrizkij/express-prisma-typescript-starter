import { IPermission } from "./permission.interface";

export interface IUser {
    id?: number;
    email: string;
    password: string;
    name: string;
    roleId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserRegister {
    email: string;
    password: string;
    name: string;
}

export interface IRole {
    id?: number;
    name: string;
    permissions?: IPermission[];
    createdAt?: Date;
    updatedAt?: Date;
}

