import { Request, Response } from 'express';
import { RoleService } from '../services/role.service';

export class RoleController {
    private roleService: RoleService;

    constructor() {
        this.roleService = new RoleService();
    }

    createRole = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { name } = req.body;
            const role = await this.roleService.createRole({ name });
            return res.status(201).json({ message: 'Role created successfully', data: role });
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Failed to create role' });
        }
    };

    getRoleById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const role = await this.roleService.getRoleById(Number(id));
            if (!role) return res.status(404).json({ message: 'Role not found' });
            return res.status(200).json({ message: 'Role retrieved successfully', data: role });
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Failed to get role' });
        }
    };

    getAllRoles = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const roles = await this.roleService.getAllRoles();
            return res.status(200).json({ message: 'Roles retrieved successfully', data: roles });
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Failed to get roles' });
        }
    };

    updateRole = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { name, permissionIds } = req.body;
            const role = await this.roleService.updateRole(Number(id), { name, permissionIds });
            return res.status(200).json({ message: 'Role updated successfully', data: role });
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Failed to update role' });
        }
    };

    deleteRole = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const role = await this.roleService.deleteRole(Number(id));
            return res.status(200).json({ message: 'Role deleted successfully', data: role });
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Failed to delete role' });
        }
    };
} 