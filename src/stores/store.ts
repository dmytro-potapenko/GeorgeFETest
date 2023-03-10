import { computed, configure, makeObservable, observable } from 'mobx';

import { AppError } from '../types/error';
import { Nullable } from '../types/types';
import { CurrenciesStore } from './currencies';
import { NotificationStore } from './notification';

configure({ enforceActions: 'never' });

export class Store {
    public ownFetching: boolean;

    public readonly currenciesStore: CurrenciesStore;
    public readonly notificationStore: NotificationStore;

    constructor() {
        this.ownFetching = false;
        // common stores
        this.notificationStore = new NotificationStore();
        // app stores
        this.currenciesStore = new CurrenciesStore(this.notificationStore);

        makeObservable(this, {
            ownFetching: observable,
            appError: computed,
            fetching: computed,
        });
    }

    public get appError(): Nullable<AppError> {
        return this.currenciesStore.error;
    }

    public get fetching(): boolean {
        return this.ownFetching || this.currenciesStore.fetching;
    }
}
