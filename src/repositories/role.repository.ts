import { Prisma, PrismaClient, Role } from "@prisma/client";

export class RoleRepository{
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async findByName(name: string): Promise<Role | null> {
        return this.prisma.role.findUnique({
            where: { name }
        });
    }
    
    async findById(id: number): Promise<Role | null> {
        return this.prisma.role.findUnique({
            where: { id }
        });
    }

    async findAll(): Promise<Role[]> {
        return this.prisma.role.findMany();
    }

    async create(data: Prisma.RoleCreateInput): Promise<Role> {
        return this.prisma.role.create({
            data
        });
    }

    async update(id: number, data: Prisma.RoleUpdateInput): Promise<Role> {
        return this.prisma.role.update({
            where: { id },
            data
        });
    }

    async delete(id: number): Promise<Role> {
        return this.prisma.role.delete({
            where: { id }
        });
    }
}