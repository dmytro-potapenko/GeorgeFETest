import { AxiosResponse } from 'axios';
import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { CurrenciesExternal } from '../types/currenciesExternal';
import { Currencies, Currency } from '../types/currency';

const getFlag = (abbreviation: string): string | undefined => {
    const name = abbreviation.slice(0, 2).toLocaleLowerCase();
    let flag: NodeRequire | undefined;
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        flag = require(`../assets/flags/${name}.png`) as unknown as NodeRequire;
    } catch (_) {
        flag = undefined;
    }
    return flag ? flag.toString() : undefined;
};

export const mapCurrencies = ({ data: { baseCurrency }, data }: AxiosResponse<CurrenciesExternal>): Currencies =>
    pipe(
        data.fx,
        map(({ nameI18N, currency, exchangeRate }) => ({
            name: nameI18N,
            abbreviation: currency,
            exchangeRate: {
                buy: exchangeRate?.buy?.toFixed(2),
                sell: exchangeRate?.sell?.toFixed(2),
            },
            flag: getFlag(currency),
        })),
        currencies => ({ baseCurrency, currencies })
    );

export const filterCurrencies = (currencies: Currency[], keyWord: string) =>
    currencies.filter(
        ({ abbreviation, name }) =>
            (abbreviation.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()) ||
                name?.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())) &&
            !!abbreviation.trim()
    );
