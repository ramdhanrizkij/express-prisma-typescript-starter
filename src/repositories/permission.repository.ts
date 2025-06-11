import { Permission, Prisma, PrismaClient } from "@prisma/client";

export class PermissionRepository{
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async findById(id: number): Promise<Permission | null> {
        return this.prisma.permission.findUnique({
            where: { id }
        });
    }

    async findAll(): Promise<Permission[]> {
        return this.prisma.permission.findMany();
    }

    async findByName(name: string): Promise<Permission | null> {
        return this.prisma.permission.findUnique({
            where: { name }
        });
    }

    async create(data: Prisma.PermissionCreateInput): Promise<Permission> {
        return this.prisma.permission.create({
            data
        });
    }

    async update(id: number, data: Prisma.PermissionUpdateInput): Promise<Permission> {
        return this.prisma.permission.update({
            where: { id },
            data
        });
    }

    async delete(id: number): Promise<Permission> {
        return this.prisma.permission.delete({
            where: { id }
        });
    }
}