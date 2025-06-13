import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password, name } = req.body;
            const result = await this.authService.register({
                email,
                password,
                name,
            });

            return res.status(201).json({
                message: 'User registered successfully',
                data: {
                    user: {
                        id: result.user.id,
                        email: result.user.email,
                        name: result.user.name,
                        roleId: result.user.roleId
                    },
                    token: result.token
                }
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || 'Registration failed'
            });
        }
    };

    login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);

            return res.status(200).json({
                message: 'Login successful',
                data: {
                    user: {
                        id: result.user.id,
                        email: result.user.email,
                        name: result.user.name,
                        roleId: result.user.roleId
                    },
                    token: result.token
                }
            });
        } catch (error: any) {
            console.log("Failed to login :",error.message)
            return res.status(401).json({
                message: error.message || 'Login failed'
            });
        }
    };
}