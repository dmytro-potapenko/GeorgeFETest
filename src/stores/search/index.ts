import { pipe } from 'fp-ts/lib/function';
import { bind, Do, map } from 'fp-ts/lib/Task';
import { action, makeObservable, observable } from 'mobx';
import { Nullable } from '../../types/types';
import { enrichCurrencies } from '../../utils/currencies';
import { BaseCumulativeStore } from '../base/baseCumulativeStore';
import { EnrichedCurrencies } from './../../types/search/currencies';
import { CountriesStore } from './countries';
import { CurrenciesStore } from './currencies';

export class SearchStore extends BaseCumulativeStore {
    enrichedCurrencies: Nullable<EnrichedCurrencies> = null;

    public readonly currenciesStore: CurrenciesStore;
    public readonly countriesStore: CountriesStore;

    constructor() {
        const currenciesStore = new CurrenciesStore();
        const countriesStore = new CountriesStore();

        super([currenciesStore, countriesStore]);

        this.currenciesStore = currenciesStore;
        this.countriesStore = countriesStore;

        makeObservable(this, {
            getAll: action,
            enrichedCurrencies: observable,
        });
    }

    async getAll() {
        const getAllAction = pipe(
            Do,
            bind('currencies', () => this.currenciesStore.getAll.bind(this.currenciesStore)),
            bind('countries', () => this.countriesStore.getAll.bind(this.countriesStore)),
            map(({ currencies, countries }) => enrichCurrencies(currencies, countries))
        );

        return this.run(getAllAction).then(data => (this.enrichedCurrencies = data));
    }
}
