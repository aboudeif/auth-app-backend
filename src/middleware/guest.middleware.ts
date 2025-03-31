import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const guestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        return next(AppError.forbidden('You are already logged in'));
    }
    next();
}; 