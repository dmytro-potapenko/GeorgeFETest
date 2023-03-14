import { action, makeObservable } from 'mobx';
import { createGetAll } from '../../service/countries';
import { CountriesMap } from '../../types/search/countries';
import { Nullable } from '../../types/types';
import { BaseStore } from '../base/baseStore';

export class CountriesStore extends BaseStore<Nullable<CountriesMap>> {
    constructor() {
        super(() => null);

        makeObservable(this, {
            getAll: action,
        });
    }

    getAll() {
        const getAllAction = createGetAll();

        return this.update(getAllAction);
    }
}
