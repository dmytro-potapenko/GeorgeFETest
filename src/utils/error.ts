import { AppError, AppErrorType } from '../types/error';
import { Nullable } from '../types/types';

export const genericError = <T extends { message: string }>({
    message,
}: T): Nullable<AppError> => ({
    message,
    type: AppErrorType.General,
});
