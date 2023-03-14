import { action, makeObservable } from 'mobx';
import { createGetAll } from '../../service/currencies';
import { Currencies } from '../../types/search/currencies';
import { Nullable } from '../../types/types';
import { BaseStore } from '../base/baseStore';

export class CurrenciesStore extends BaseStore<Nullable<Currencies>> {
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
