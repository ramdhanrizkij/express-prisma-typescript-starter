import { PrismaClient, User } from '@prisma/client';
import { IUser } from '../interfaces/user.interface';

export class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: IUser): Promise<User> {
        return this.prisma.user.create({
            data,
            include: {
                role: true
            }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
            include: {
                role: {
                    include: {
                        permissions: true
                    }
                }
            }
        });
    }

    async findById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                role: {
                    include: {
                        permissions: true
                    }
                }
            }
        });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany({
            include: {
                role: true
            }
        });
    }

    async update(id: number, data: Partial<IUser>): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data,
            include: {
                role: true
            }
        });
    }

    async delete(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: { id }
        });
    }
}