import { Response } from 'express';
import { AppError } from '../utils/AppError';
import { HttpStatus } from '../constants/error.constants';
import { SuccessResponse, ErrorResponse } from '../types/response.types';

export class ResponseService {
    static success<T>(
        res: Response,
        data: T,
        message?: string,
        meta?: SuccessResponse<T>['meta'],
        statusCode: number = HttpStatus.OK
    ): Response {
        const response: SuccessResponse<T> = {
            success: true,
            message,
            data,
            meta,
            timestamp: new Date().toISOString()
        };
        return res.status(statusCode).json(response);
    }

    static error(
        res: Response,
        error: AppError | Error
    ): Response {
        const response: ErrorResponse = {
            success: false,
            timestamp: new Date().toISOString(),
            error: error instanceof AppError ? {
                code: error.errorCode,
                message: error.message,
                details: error.details
            } : {
                code: 'INTERNAL_ERROR',
                message: error.message || 'An unexpected error occurred'
            }
        };

        const statusCode = error instanceof AppError 
            ? error.statusCode 
            : HttpStatus.INTERNAL_SERVER_ERROR;

        return res.status(statusCode).json(response);
    }
} 