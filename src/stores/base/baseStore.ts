import { AxiosError } from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { AppError } from '../../types/error';
import { Nullable } from '../../types/types';
import { genericError } from '../../utils/error';

export abstract class BaseStore<T> {
    public initialData: T;
    public data: T;
    public fetching = false;
    public error: Nullable<AppError> = null;

    constructor(init: () => T) {
        makeObservable(this, {
            initialData: observable,
            data: observable,
            fetching: observable,
            error: observable,
            update: action,
            run: action,
            clear: action,
        });
        this.data = init();
        this.initialData = init();
    }

    public async update(
        func: () => Promise<T>,
        fetching = true,
        expectedErrorCodes: Nullable<number[]> = null
    ): Promise<T> {
        try {
            this.error = null;
            this.fetching = fetching;
            const data = await func();
            this.data = data;
        } catch (error) {
            this.error = genericError(error as AxiosError, expectedErrorCodes);
        } finally {
            this.fetching = false;
            return this.data;
        }
    }

    public async run<T = unknown>(
        func: () => Promise<T>,
        fetching = true,
        expectedErrorCodes: Nullable<number[]> = null
    ): Promise<Nullable<T>> {
        let response: Nullable<T> = null;
        try {
            this.error = null;
            this.fetching = fetching;
            response = await func();
        } catch (error) {
            this.error = genericError(error as AxiosError, expectedErrorCodes);
        } finally {
            this.fetching = false;
        }
        return response;
    }

    public clear(): void {
        this.data = this.initialData;
    }
}
