export enum AppErrorType {
    General = 'General',
}

type ApiErrorData = {
    data: string;
    status: number;
};

export type ApiErrorRes = {
    response: {
        data: ApiErrorData;
    };
};

export type AppError = {
    message: string;
    type: AppErrorType;
};
