import { CountriesMap } from '../types/search/countries';
import { Currencies, EnrichedCurrencies, EnrichedCurrency } from '../types/search/currencies';
import { CurrenciesExternal } from '../types/search/currenciesExternal';
import { Nullable } from '../types/types';
import {
    enrichCurrencies,
    filterCurrencies,
    getAlpha2Code,
    getFlag,
    mapCurrencies,
} from './currencies';

describe('Test `currencies` file', () => {
    describe('getAlpha2Code', () => {
        it.each<[string, string, string]>([
            ['should extract a proper alpha2 code from the currency abbreviation', 'USD', 'us'],
            ['should return `` if the payload is an emty string', '', ''],
            ['should return `` if a payload string length is less than 2', 'U', ''],
        ])('%s', (_, payload, expected) => {
            const result = getAlpha2Code(payload);

            expect(result).toEqual(expected);
        });
    });

    describe('getFlag', () => {
        it.each<[string, string, string | undefined]>([
            ['should extract a proper flag path from alpha2 code', 'us', 'us.png'],
            ['should return `undefined` if the payload is an emty string', '', undefined],
            ["should return `undefined` if the flag wasn't found", 'fake-string', undefined],
        ])('%s', (_, payload, expected) => {
            const result = getFlag(payload);

            expect(result).toEqual(expected);
        });
    });

    describe('mapCurrencies', () => {
        const dataMock: CurrenciesExternal = {
            institute: 198,
            lastUpdated: '2018-11-09T15:07:00Z',
            comparisonDate: '2018-11-09T12:45:00Z',
            baseCurrency: 'EUR',
            fx: [
                {
                    currency: 'FJD',
                    precision: 2,
                    nameI18N: 'Fiji Dollar',
                    exchangeRate: {
                        buy: 2.0,
                        middle: 2.25,
                        sell: 2.5555,
                        indicator: 0,
                        lastModified: '2012-02-14T23:00:00Z',
                    },
                    banknoteRate: {
                        buy: 2.2121,
                        middle: 2.4,
                        sell: 2.6,
                        indicator: 0,
                        lastModified: '2018-11-06T23:00:00Z',
                    },
                    flags: ['provided'],
                },
            ],
        };
        it.each<[string, CurrenciesExternal, Currencies]>([
            [
                'should map external currencies data properly',
                dataMock,
                {
                    baseCurrency: 'EUR',
                    currencies: [
                        {
                            name: 'Fiji Dollar',
                            abbreviation: 'FJD',
                            exchangeRate: { buy: '2.00', sell: '2.56' },
                            alpha2Code: 'fj',
                            flag: 'fj.png',
                        },
                    ],
                },
            ],
            [
                "should map external currencies data properly if it's almost empty",
                {
                    ...dataMock,
                    fx: [
                        {
                            currency: 'FFF',
                            precision: 2,
                        },
                    ],
                },
                {
                    baseCurrency: 'EUR',
                    currencies: [
                        {
                            name: '',
                            abbreviation: 'FFF',
                            exchangeRate: { buy: undefined, sell: undefined },
                            alpha2Code: 'ff',
                            flag: undefined,
                        },
                    ],
                },
            ],
            [
                "should map external currencies data properly if it's almost empty",
                {
                    ...dataMock,
                    fx: [
                        {
                            currency: '',
                            precision: 0,
                        },
                    ],
                },
                {
                    baseCurrency: 'EUR',
                    currencies: [
                        {
                            name: '',
                            abbreviation: '',
                            exchangeRate: { buy: undefined, sell: undefined },
                            alpha2Code: '',
                            flag: undefined,
                        },
                    ],
                },
            ],
        ])('%s', (_, payload, expected) => {
            const result = mapCurrencies(payload);

            expect(result).toEqual(expected);
        });
    });

    describe('mapCurrencies', () => {
        const currenciesMock: Currencies = {
            baseCurrency: 'EUR',
            currencies: [
                {
                    name: 'Fiji Dollar',
                    abbreviation: 'FJD',
                    exchangeRate: { buy: '2.00', sell: '2.56' },
                    alpha2Code: 'fj',
                    flag: 'fj.png',
                },
            ],
        };
        const countriesMapMock: CountriesMap = new Map([
            ['fj', { alpha2Code: 'fj', name: 'Fiji' }],
        ]);
        it.each<
            [string, Nullable<Currencies>, Nullable<CountriesMap>, Nullable<EnrichedCurrencies>]
        >([
            ['should return `null` if any of the params is `null`', null, countriesMapMock, null],
            ['should return `null` if any of the params is `null`', currenciesMock, null, null],
            ['should return `null` if any of the params is `null`', null, null, null],
            [
                'should enrich currencies data properly',
                currenciesMock,
                countriesMapMock,
                {
                    baseCurrency: 'EUR',
                    currencies: [
                        {
                            name: 'Fiji Dollar',
                            abbreviation: 'FJD',
                            exchangeRate: { buy: '2.00', sell: '2.56' },
                            alpha2Code: 'fj',
                            flag: 'fj.png',
                            countryName: 'Fiji',
                            isCommon: false,
                        },
                    ],
                },
            ],
            [
                `should enrich currencies data properly
                (should assign a "Common currency" value to the \`countryName\`, and \`true\` value to \`isCommon\` field)
                if a correlating country wasn't found`,
                currenciesMock,
                new Map(),
                {
                    baseCurrency: 'EUR',
                    currencies: [
                        {
                            name: 'Fiji Dollar',
                            abbreviation: 'FJD',
                            exchangeRate: { buy: '2.00', sell: '2.56' },
                            alpha2Code: 'fj',
                            flag: 'fj.png',
                            countryName: 'Common currency',
                            isCommon: true,
                        },
                    ],
                },
            ],
        ])('%s', (_, payload1, payload2, expected) => {
            const result = enrichCurrencies(payload1, payload2);

            expect(result).toEqual(expected);
        });
    });

    describe('filterCurrencies', () => {
        const enrichedCurrenciesMock: EnrichedCurrency[] = [
            {
                name: 'Fiji Dollar',
                abbreviation: 'FJD',
                exchangeRate: { buy: '2.00', sell: '2.56' },
                alpha2Code: 'fj',
                flag: 'fj.png',
                countryName: 'Fiji',
                isCommon: false,
            },
            {
                name: 'United States Dollar',
                abbreviation: 'USD',
                exchangeRate: { buy: '2.00', sell: '2.56' },
                alpha2Code: 'us',
                flag: 'us.png',
                countryName: 'United States of America',
                isCommon: false,
            },
        ];
        it.each<[string, EnrichedCurrency[], string, EnrichedCurrency[]]>([
            [
                'should return the whole list if `keyWord` is an empty string',
                enrichedCurrenciesMock,
                '',
                enrichedCurrenciesMock,
            ],
            [
                'should filter data properly',
                enrichedCurrenciesMock,
                'fi',
                [enrichedCurrenciesMock[0]],
            ],
            [
                'should return an empty array if nothing was found',
                enrichedCurrenciesMock,
                'bla-bla',
                [],
            ],
            ['should return an empty array if payload was `[]`', [], '', []],
        ])('%s', (_, payload1, payload2, expected) => {
            const result = filterCurrencies(payload1, payload2);

            expect(result).toEqual(expected);
        });
    });
});
