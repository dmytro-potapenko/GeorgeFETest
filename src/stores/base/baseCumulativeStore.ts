import { action, computed, makeObservable, observable } from 'mobx';
import { AppError } from '../../types/error';
import { Nullable } from '../../types/types';
import { BaseStore } from './baseStore';

export abstract class BaseCumulativeStore {
    public ownFetching = false;

    constructor(private stores: BaseStore<unknown>[]) {
        makeObservable(this, {
            ownFetching: observable,
            error: computed,
            fetching: computed,
            run: action,
            clear: action,
        });
    }

    public get error(): Nullable<AppError> {
        return this.stores.reduce<Nullable<AppError>>((acc, store) => acc || store.error, null);
    }

    public get fetching(): boolean {
        return this.stores.reduce((acc, store) => acc || store.fetching, this.ownFetching);
    }

    public async run<T = unknown>(func: () => Promise<T>, fetching = true): Promise<T> {
        try {
            this.ownFetching = fetching;
            return await func();
        } finally {
            this.ownFetching = false;
        }
    }

    public clear(): void {
        return this.stores.forEach(store => store.clear());
    }
}
