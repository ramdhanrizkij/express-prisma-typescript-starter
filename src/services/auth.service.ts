import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { IUserRegister } from '../interfaces/user.interface';
import { RoleRepository } from '../repositories/role.repository';

export class AuthService {
    private userService: UserService;
    private roleRepository: RoleRepository;

    constructor() {
        this.userService = new UserService();
        this.roleRepository = new RoleRepository();
    }

    async register(userData: IUserRegister): Promise<{ user: User; token: string }> {
        const existingUser = await this.userService.getUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const userRole = await this.roleRepository.findByName('User');
        if (!userRole) {
            throw new Error('Role not found');
        }

        const user = await this.userService.createUser({
            ...userData,
            roleId: userRole.id
        });
        const token = this.generateToken(user);

        return { user, token };
    }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await this.userService.validatePassword(user, password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        const token = this.generateToken(user);
        return { user, token };
    }

    private generateToken(user: User): string {
        const secret = process.env.JWT_SECRET || 'default_secret';
        return jwt.sign(
            { 
                userId: user.id,
                email: user.email,
                roleId: user.roleId
            },
            secret,
            { expiresIn: '24h' }
        );
    }

    verifyToken(token: string): any {
        const secret = process.env.JWT_SECRET || 'default_secret';
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}