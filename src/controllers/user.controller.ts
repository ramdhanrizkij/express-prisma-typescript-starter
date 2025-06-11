import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    createUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const userData = req.body;
            const user = await this.userService.createUser(userData);
            return res.status(201).json({
                message: 'User created successfully',
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    roleId: user.roleId,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            });
        }catch(error: any) {
            return res.status(500).json({
                message: error.message || 'Error creating user'
            });
        }
    }

    getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json({
                message: 'Users retrieved successfully',
                data: users.map(user => ({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    roleId: user.roleId,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }))
            });
        } catch (error: any) {
            return res.status(500).json({
                message: error.message || 'Error retrieving users'
            });
        }
    };

    getUserById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.getUserById(id);

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                message: 'User retrieved successfully',
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    roleId: user.roleId,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            });
        } catch (error: any) {
            return res.status(500).json({
                message: error.message || 'Error retrieving user'
            });
        }
    };

    updateUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            const userData = req.body;

            const updatedUser = await this.userService.updateUser(id, userData);
            return res.status(200).json({
                message: 'User updated successfully',
                data: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    name: updatedUser.name,
                    roleId: updatedUser.roleId,
                    createdAt: updatedUser.createdAt,
                    updatedAt: updatedUser.updatedAt
                }
            });
        } catch (error: any) {
            return res.status(500).json({
                message: error.message || 'Error updating user'
            });
        }
    };

    deleteUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            await this.userService.deleteUser(id);

            return res.status(200).json({
                message: 'User deleted successfully'
            });
        } catch (error: any) {
            return res.status(500).json({
                message: error.message || 'Error deleting user'
            });
        }
    };
}