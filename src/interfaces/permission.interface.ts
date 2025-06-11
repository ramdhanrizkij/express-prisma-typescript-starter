import { IRole } from "./user.interface";

export interface IPermission {
    id?: number;
    name: string;
    roles?: IRole[];
    createdAt?: Date;
    updatedAt?: Date;
}