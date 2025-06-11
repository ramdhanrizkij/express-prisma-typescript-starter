import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, body } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        return res.status(400).json({
            errors: errors.array()
        });
    };
};

export const registerValidation = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required')
];

export const loginValidation = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
];

export const updateUserValidation = [
    body('email').optional().isEmail().withMessage('Invalid email address'),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('roleId').optional().isInt().withMessage('Role ID must be an integer')
];

export const createUserValidation = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
    body('roleId').isInt().withMessage('Role ID must be an integer')
]

export const createRoleValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('permissionIds')
        .optional()
        .isArray({ min: 1 }).withMessage('permissionIds must be a non-empty array')
        .bail()
        .custom((arr) => arr.every(Number.isInteger)).withMessage('All permissionIds must be integers')
]

export const updateRoleValidation = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('permissionIds')
        .optional()
        .isArray({ min: 1 }).withMessage('permissionIds must be a non-empty array')
        .bail()
        .custom((arr) => arr.every(Number.isInteger)).withMessage('All permissionIds must be integers')
]

export const createPermissionValidation = [
    body('name').notEmpty().withMessage('Name is required')
]

export const updatePermissionValidation = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty')
]