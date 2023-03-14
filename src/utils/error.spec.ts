import { AppError, AppErrorType } from '../types/error';
import { genericError } from './error';

describe('Test `error` file', () => {
    describe('genericError', () => {
        it.each<[string, { message: string }, AppError]>([
            [
                'should return the proper error object if error message is an empty string',
                { message: '' },
                {
                    message: '',
                    type: AppErrorType.General,
                },
            ],
            [
                'should return the proper error object if error message is a non empty string',
                {
                    message: 'Request failed with status code 404',
                },
                {
                    message: 'Request failed with status code 404',
                    type: AppErrorType.General,
                },
            ],
        ])('%s', (_, payload, expected) => {
            const result = genericError(payload);

            expect(result).toEqual(expected);
        });
    });
});
