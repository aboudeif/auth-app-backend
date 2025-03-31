export interface BaseResponse {
    success: boolean;
    message?: string;
    timestamp: string;
}

export interface SuccessResponse<T> extends BaseResponse {
    success: true;
    data: T;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
}

export interface ErrorResponse extends BaseResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: Record<string, any>;
    };
} 