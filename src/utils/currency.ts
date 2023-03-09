import { AxiosResponse } from 'axios';
import { CurrenciesExternal } from '../types/currenciesExternal';
import { Currency } from '../types/currency';

export const mapCurrencies = ({ data }: AxiosResponse<CurrenciesExternal>): Currency[] =>
    data.fx.map(({ nameI18N: name, currency: abbreviation, exchangeRate: { buy, sell } = {} }) => ({
        name,
        abbreviation,
        exchangeRate: {
            buy,
            sell,
        },
        flag: '',
    }));
