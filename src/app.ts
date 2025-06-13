import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorLoggerMiddleware, requestLoggerMiddleware } from './utils/logger';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { roleRoutes } from './routes/role.routes';
import { permissionRoutes } from './routes/permission.routes';

dotenv.config();

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());

        this.app.use(requestLoggerMiddleware);
        this.app.use(errorLoggerMiddleware);

        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

    private routes(): void {
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/roles', roleRoutes);
        this.app.use('/api/permission', permissionRoutes);
    }
}

export default new App().app;