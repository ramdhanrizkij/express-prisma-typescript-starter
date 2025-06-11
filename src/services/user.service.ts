import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../interfaces/user.interface';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userData: IUser): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return this.userRepository.create({
            ...userData,
            password: hashedPassword
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async updateUser(id: number, userData: Partial<IUser>): Promise<User> {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return this.userRepository.update(id, userData);
    }

    async deleteUser(id: number): Promise<User> {
        return this.userRepository.delete(id);
    }

    async validatePassword(user: User, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password);
    }
}