import { BaseCumulativeStore } from '../base/baseCumulativeStore';
import { NotificationStore } from '../notification';
import { CurrenciesListStore } from './list';

export class CurrenciesStore extends BaseCumulativeStore {
    public readonly list: CurrenciesListStore;

    constructor(notification: NotificationStore) {
        const currenciesList = new CurrenciesListStore(notification);

        super([currenciesList]);

        this.list = currenciesList;
    }
}
