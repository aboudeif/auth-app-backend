import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../utils/AppError';
import { ResponseService } from '../services/ResponseService';
import { Logger } from '../utils/Logger';

export const errorHandler: ErrorRequestHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Log error details
    Logger.error({
        message: error.message,
        stack: error.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query
    });

    // Handle validation errors (e.g., express-validator)
    if (error.name === 'ValidationError') {
        const validationError = AppError.validation(
            'Validation failed',
            { errors: error['errors'] }
        );
        ResponseService.error(res, validationError);
        return;
    }

    // Handle MongoDB/Mongoose errors
    if (error.name === 'MongoError' || error.name === 'MongooseError') {
        const dbError = AppError.internal('Database operation failed');
        ResponseService.error(res, dbError);
        return;
    }

    // Handle known application errors
    if (error instanceof AppError) {
        ResponseService.error(res, error);
        return;
    }

    // Handle unknown errors
    const internalError = AppError.internal();
    ResponseService.error(res, internalError);
}; 