import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    next(AppError.notFound(`Route ${req.originalUrl} not found`));
}; 