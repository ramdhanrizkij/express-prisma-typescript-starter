import { Role } from "@prisma/client";
import { RoleRepository } from "../repositories/role.repository";
import { IRole } from "../interfaces/user.interface";

export class RoleService {
    private roleRepository: RoleRepository

    constructor() {
        this.roleRepository = new RoleRepository();
    }

    async createRole(roleData: IRole): Promise<Role> {
        return this.roleRepository.create({
            name: roleData.name,
        });
    }

    async getRoleById(id:number):Promise<Role | null>{
        return this.roleRepository.findById(id)
    }

    async getAllRoles():Promise<Role[]>{
        return this.roleRepository.findAll();
    }

    async updateRole(id:number, roleData: Partial<IRole> & { permissionIds?: number[] }):Promise<Role>{
        const data: any = {};
        if (roleData.name) data.name = roleData.name;
        if (roleData.permissionIds) {
            data.permissions = { set: roleData.permissionIds.map((pid) => ({ id: pid })) };
        }
        return this.roleRepository.update(id, data);
    }

    async deleteRole(id:number):Promise<Role>{
        return this.roleRepository.delete(id)
    }
}