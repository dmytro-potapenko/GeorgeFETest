import { AxiosError } from 'axios';
import { AppError, AppErrorType } from '../types/error';
import { Nullable } from '../types/types';

export const genericError = (error: AxiosError, expectedErrorCodes: Nullable<number[]> = null): Nullable<AppError> => {
    const { message, response } = error;

    if (expectedErrorCodes && response?.status && expectedErrorCodes.includes(response.status)) return null;

    return { message, type: AppErrorType.General };
};
