import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { CountriesMap } from '../types/search/countries';
import { Currencies, EnrichedCurrencies, EnrichedCurrency } from '../types/search/currencies';
import { CurrenciesExternal } from '../types/search/currenciesExternal';
import { Nullable, Optional } from '../types/types';

export const getAlpha2Code = (abbreviation: string): string =>
    abbreviation.length >= 2 ? abbreviation.slice(0, 2).toLocaleLowerCase() : '';

export const getFlag = (alpha2Code: string): string | undefined => {
    let flag: NodeRequire | undefined;
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        flag = require(`../assets/flags/${alpha2Code}.png`) as unknown as NodeRequire;
    } catch (_) {
        flag = undefined;
    }
    return flag?.toString();
};

export const mapCurrencies = ({ baseCurrency, fx }: CurrenciesExternal): Currencies =>
    pipe(
        fx,
        map(({ nameI18N = '', currency, exchangeRate }) => {
            const alpha2Code = getAlpha2Code(currency);

            return {
                name: nameI18N,
                abbreviation: currency,
                exchangeRate: {
                    buy: exchangeRate?.buy?.toFixed(2),
                    sell: exchangeRate?.sell?.toFixed(2),
                },
                flag: getFlag(alpha2Code),
                alpha2Code,
            };
        }),
        currencies => ({ baseCurrency, currencies })
    );

export const enrichCurrencies = (
    currencies: Nullable<Currencies>,
    countries: Nullable<CountriesMap>
): Nullable<EnrichedCurrencies> =>
    currencies && countries
        ? pipe(
              currencies.currencies,
              map(currency => {
                  const countryName: Optional<string> = countries.get(currency.alpha2Code)?.name;

                  return {
                      ...currency,
                      countryName: countryName ?? 'Common currency',
                      isCommon: !countryName,
                  };
              }),
              payload => ({ baseCurrency: currencies.baseCurrency, currencies: payload })
          )
        : null;

export const filterCurrencies = (currencies: EnrichedCurrency[], keyWord: string) =>
    currencies.filter(
        ({ abbreviation, name, countryName }) =>
            (abbreviation.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()) ||
                name?.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()) ||
                countryName?.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())) &&
            !!abbreviation.trim()
    );
