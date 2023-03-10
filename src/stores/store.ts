import { computed, configure, makeObservable, observable } from 'mobx';

import { AppError } from '../types/error';
import { Nullable } from '../types/types';
import { NotificationStore } from './notification';
import { SearchStore } from './search';

configure({ enforceActions: 'never' });

export class Store {
    public ownFetching: boolean;

    public readonly searchStore: SearchStore;
    public readonly notificationStore: NotificationStore;

    constructor() {
        this.ownFetching = false;
        // common stores
        this.notificationStore = new NotificationStore();
        // app stores
        this.searchStore = new SearchStore(this.notificationStore);

        makeObservable(this, {
            ownFetching: observable,
            appError: computed,
            fetching: computed,
        });
    }

    public get appError(): Nullable<AppError> {
        return this.searchStore.error;
    }

    public get fetching(): boolean {
        return this.ownFetching || this.searchStore.fetching;
    }
}
