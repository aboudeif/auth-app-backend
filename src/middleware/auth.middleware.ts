import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw AppError.unauthorized('No token provided');
        }

        const token = authHeader.split(' ')[1];
        
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
            req.user = decoded;
            next();
        } catch (error) {
            throw AppError.unauthorized('Invalid token');
        }
    } catch (error) {
        next(error);
    }
}; 