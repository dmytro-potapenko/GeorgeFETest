import { action, makeObservable } from 'mobx';
import { createGetAll } from '../../service/currencies';
import { Currencies } from '../../types/search/currencies';
import { Nullable } from '../../types/types';
import { BaseStore } from '../base/baseStore';
import { NotificationStore } from '../notification';

export class CurrenciesStore extends BaseStore<Nullable<Currencies>> {
    constructor(private notification: NotificationStore) {
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
