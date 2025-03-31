import { ErrorTypes, HttpStatus } from '../constants/error.constants';

export class AppError extends Error {
    public readonly errorCode: string;
    public readonly statusCode: number;
    public readonly details?: Record<string, any>;
    public readonly timestamp: string;

    constructor(
        errorCode: keyof typeof ErrorTypes,
        message: string,
        statusCode: number,
        details?: Record<string, any>
    ) {
        super(message);
        this.errorCode = ErrorTypes[errorCode];
        this.statusCode = statusCode;
        this.details = details;
        this.timestamp = new Date().toISOString();
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string, details?: Record<string, any>) {
        return new AppError('INVALID_REQUEST', message, HttpStatus.BAD_REQUEST, details);
    }

    static validation(message: string, details?: Record<string, any>) {
        return new AppError('VALIDATION_ERROR', message, HttpStatus.BAD_REQUEST, details);
    }

    static unauthorized(message: string = 'Unauthorized access') {
        return new AppError('UNAUTHORIZED', message, HttpStatus.UNAUTHORIZED);
    }

    static forbidden(message: string = 'Access forbidden') {
        return new AppError('FORBIDDEN', message, HttpStatus.FORBIDDEN);
    }

    static notFound(message: string = 'Resource not found') {
        return new AppError('NOT_FOUND', message, HttpStatus.NOT_FOUND);
    }

    static conflict(message: string, details?: Record<string, any>) {
        return new AppError('CONFLICT', message, HttpStatus.CONFLICT, details);
    }

    static internal(message: string = 'Internal server error') {
        return new AppError('INTERNAL_ERROR', message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
} 