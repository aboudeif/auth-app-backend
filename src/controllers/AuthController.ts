import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { ResponseService } from '../services/ResponseService';
import { AppError } from '../utils/AppError';

export class AuthController {
    constructor(private authService: AuthService) {}

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                throw AppError.badRequest('Email, password and name are required');
            }

            const result = await this.authService.signup(email, password, name);
            return ResponseService.success(res, result, 'User registered successfully');
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw AppError.badRequest('Email and password are required');
            }

            const result = await this.authService.login(email, password);
            return ResponseService.success(res, result, 'Login successful');
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('token');
            return ResponseService.success(res, null, 'Logout successful');
        } catch (error) {
            next(error);
        }
    }

    // logout(req: Request, res: Response) {
    //     this.authService.logout()
    //         .then(result => {
    //             res.status(200).json(result);
    //         })
    //         .catch(error => {
    //             res.status(error.statusCode || 500).json({
    //                 message: error.message,
    //                 statusCode: error.statusCode || 500
    //             });
    //         });
    // }
}