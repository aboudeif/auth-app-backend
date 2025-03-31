import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { ResponseService } from '../services/ResponseService';
import { AppError } from '../utils/AppError';

export class UserController {
    constructor(private userService: UserService) {}

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const user = await this.userService.findById(userId);
            
            if (!user) {
                throw AppError.notFound('User not found');
            }

            return ResponseService.success(res, user);
        } catch (error) {
            next(error);
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = req.body;
            const user = await this.userService.create(userData);
            return ResponseService.success(res, user);
        } catch (error) {
            next(error);
        }
    }
} 