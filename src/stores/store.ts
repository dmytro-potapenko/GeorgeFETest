import { computed, configure, makeObservable, observable } from 'mobx';

import { AppError } from '../types/error';
import { Nullable } from '../types/types';
import { SearchStore } from './search';

configure({ enforceActions: 'never' });

export class Store {
    public ownFetching: boolean;

    public readonly searchStore: SearchStore;

    constructor() {
        this.ownFetching = false;
        // app stores
        this.searchStore = new SearchStore();

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
