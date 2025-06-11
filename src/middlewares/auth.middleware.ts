import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

interface AuthRequest extends Request {
    user?: any;
}

export class AuthMiddleware {
    private authService: AuthService;
    private userService: UserService;

    constructor() {
        this.authService = new AuthService();
        this.userService = new UserService();
    }

    authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const token = authHeader.split(' ')[1];
            const decoded = this.authService.verifyToken(token);
            
            const user = await this.userService.getUserById(decoded.userId);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };

    isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.user || !req.user.role) {
                return res.status(403).json({ message: 'Access denied' });
            }

            if (req.user.role.name.toLowerCase() !== 'admin') {
                return res.status(403).json({ message: 'Admin access required' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    hasPermission = (permissionName: string) => {
        return async (req: AuthRequest, res: Response, next: NextFunction) => {
            try {
                if (!req.user || !req.user.role || !req.user.role.permissions) {
                    return res.status(403).json({ message: 'Access denied' });
                }

                const hasPermission = req.user.role.permissions.some(
                    (permission: any) => permission.name === permissionName
                );

                if (!hasPermission) {
                    return res.status(403).json({ message: 'Permission denied' });
                }

                next();
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }
        };
    };
}