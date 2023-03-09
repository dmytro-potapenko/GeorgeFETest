import { computed, configure, makeObservable, observable } from 'mobx';

import { AppError } from '../types/error';
import { Nullable } from '../types/types';
import { CurrenciesStore } from './currencies';
import { NotificationStore } from './notification';

configure({ enforceActions: 'never' });

export class Store {
    public ownFetching: boolean;

    public readonly currencies: CurrenciesStore;
    public readonly notification: NotificationStore;

    constructor() {
        this.ownFetching = false;
        // common stores
        this.notification = new NotificationStore();
        // app stores
        this.currencies = new CurrenciesStore(this.notification);

        makeObservable(this, {
            ownFetching: observable,
            appError: computed,
            fetching: computed,
        });
    }

    public get appError(): Nullable<AppError> {
        return this.currencies.error;
    }

    public get fetching(): boolean {
        return this.ownFetching || this.currencies.fetching;
    }
}
