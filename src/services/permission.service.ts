import { Permission } from "@prisma/client";
import { IPermission } from "../interfaces/permission.interface";
import { PermissionRepository } from "../repositories/permission.repository";

export class PermissionService{
    private permissionRepo:PermissionRepository;

    constructor(){
        this.permissionRepo = new PermissionRepository();
    }

    async createPermission(perssionData:IPermission):Promise<Permission>{
        return this.permissionRepo.create({
            name: perssionData.name,
        });
    }

    async getPermissionById(id:number):Promise<Permission | null>{
        return this.permissionRepo.findById(id);
    }

    async getAllPermissions():Promise<Permission[]>{
        return this.permissionRepo.findAll();
    }
    
    async updatePermission(id:number, perssionData:IPermission):Promise<Permission>{
        return this.permissionRepo.update(id, {
            name: perssionData.name,
        });
    }

    async deletePermission(id:number):Promise<Permission>{
        return this.permissionRepo.delete(id);
    }
}