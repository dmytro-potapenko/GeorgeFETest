import { action, makeObservable } from 'mobx';
import { createGet } from '../../service/currency';
import { Currencies } from '../../types/currency';
import { Nullable } from '../../types/types';
import { BaseStore } from '../base/baseStore';
import { NotificationStore } from '../notification';

export class CurrenciesDataStore extends BaseStore<Nullable<Currencies>> {
    constructor(private notification: NotificationStore) {
        super(() => null);

        makeObservable(this, {
            get: action,
        });
    }

    get() {
        const getConfigAction = createGet();

        return this.update(getConfigAction);
    }
}
