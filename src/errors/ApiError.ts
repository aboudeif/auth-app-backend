import { ErrorCode, HttpStatusCode } from '../enums/ErrorEnum';

export class ApiError extends Error {
    public readonly errorCode: ErrorCode;
    public readonly httpStatus: HttpStatusCode;
    public readonly errors?: Record<string, string[]>;
    public readonly timestamp: string;

    constructor(
        errorCode: ErrorCode,
        message: string,
        httpStatus: HttpStatusCode,
        errors?: Record<string, string[]>
    ) {
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
        this.errors = errors;
        this.timestamp = new Date().toISOString();
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static badRequest(message: string, errors?: Record<string, string[]>) {
        return new ApiError(
            ErrorCode.INVALID_INPUT,
            message,
            HttpStatusCode.BAD_REQUEST,
            errors
        );
    }

    static unauthorized(message: string = 'Unauthorized') {
        return new ApiError(
            ErrorCode.UNAUTHORIZED,
            message,
            HttpStatusCode.UNAUTHORIZED
        );
    }

    static notFound(message: string = 'Resource not found') {
        return new ApiError(
            ErrorCode.NOT_FOUND,
            message,
            HttpStatusCode.NOT_FOUND
        );
    }

    static internal(message: string = 'Internal server error') {
        return new ApiError(
            ErrorCode.INTERNAL_SERVER_ERROR,
            message,
            HttpStatusCode.INTERNAL_SERVER_ERROR
        );
    }
} 