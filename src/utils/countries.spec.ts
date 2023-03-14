import { CountriesMap, Country } from '../types/search/countries';
import { extractOnlyName, mapCountries, mapCountry } from './countries';

describe('Test `countries` file', () => {
    describe('parseName', () => {
        it.each<[string, string, string]>([
            [
                'should extract name properly if it includes `(`',
                'Some test name (Something else',
                'Some test name',
            ],
            [
                "should return same value if it doesn't include `(`",
                'Some test name',
                'Some test name',
            ],
            ['should return `` if the payload is an emty string', '', ''],
        ])('%s', (_, payload, expected) => {
            const result = extractOnlyName(payload);

            expect(result).toEqual(expected);
        });
    });

    describe('mapCountry', () => {
        it.each<[string, Country, Country]>([
            [
                'should map an object of the `Country` type properly',
                { alpha2Code: 'UA', name: 'Ukraine (Some fake text)' },
                { alpha2Code: 'ua', name: 'Ukraine' },
            ],
            [
                'should map an object of the `Country` type properly',
                { alpha2Code: '', name: 'Ukraine' },
                { alpha2Code: '', name: 'Ukraine' },
            ],
        ])('%s', (_, payload, expected) => {
            const result = mapCountry(payload);

            expect(result).toEqual(expected);
        });
    });

    describe('mapCountries', () => {
        it.each<[string, Country[], CountriesMap]>([
            [
                'should map an array of the `Country` objects properly if payload is a non empty array',
                [
                    { alpha2Code: 'UA', name: 'Ukraine (Some fake text)' },
                    { alpha2Code: 'AT', name: 'Austria' },
                ],
                new Map([
                    ['ua', { alpha2Code: 'ua', name: 'Ukraine' }],
                    ['at', { alpha2Code: 'at', name: 'Austria' }],
                ]),
            ],
            [
                'should map an array of the `Country` objects properly if payload is an empty array',
                [],
                new Map(),
            ],
        ])('%s', (_, payload, expected) => {
            const result = mapCountries(payload);

            expect(result).toEqual(expected);
        });
    });
});
