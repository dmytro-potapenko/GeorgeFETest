import { pipe } from 'fp-ts/lib/function';
import { CountriesMap, Country } from '../types/search/countries';

const parseName = (name: string) => name.split(/,|\(/)[0];

export const mapCountry = ({ alpha2Code, name }: Country): Country => ({
    name: parseName(name),
    alpha2Code: alpha2Code.toLocaleLowerCase(),
});

export const mapCountries = (countries: Country[]): CountriesMap =>
    new Map(
        countries.map(country =>
            pipe(country, mapCountry, country => [country.alpha2Code, country])
        )
    );
