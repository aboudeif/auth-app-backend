import { ErrorCode } from '../enums/ErrorEnum';

export const handleApiError = (error: any) => {
    const errorCode = error?.error?.code;
    
    switch (errorCode) {
        case ErrorCode.UNAUTHORIZED:

            break;
        case ErrorCode.VALIDATION_ERROR:

            break;
        case ErrorCode.NOT_FOUND:

            break;
        default:

    }
}; 