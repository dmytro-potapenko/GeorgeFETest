import { action, makeObservable } from 'mobx';
import { createGet } from '../../service/currency';
import { Currency } from '../../types/currency';
import { BaseStore } from '../base/baseStore';
import { NotificationStore } from '../notification';

export class CurrenciesListStore extends BaseStore<Currency[]> {
    constructor(private notification: NotificationStore) {
        super(() => []);

        makeObservable(this, {
            get: action,
        });
    }

    get() {
        const getConfigAction = createGet();

        return this.update(getConfigAction);
    }
}
