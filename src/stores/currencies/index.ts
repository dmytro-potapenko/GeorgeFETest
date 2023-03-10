import { BaseCumulativeStore } from '../base/baseCumulativeStore';
import { NotificationStore } from '../notification';
import { CurrenciesDataStore } from './currenciesData';

export class CurrenciesStore extends BaseCumulativeStore {
    public readonly currenciesDataStore: CurrenciesDataStore;

    constructor(notification: NotificationStore) {
        const currenciesDataStore = new CurrenciesDataStore(notification);

        super([currenciesDataStore]);

        this.currenciesDataStore = currenciesDataStore;
    }
}
