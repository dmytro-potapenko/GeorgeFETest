import { ActionResult } from '../types/request';
import { Country } from '../types/search/countries';
import { mapCountries } from '../utils/countries';
import { CountriesMap } from './../types/search/countries';
import { axiosInstance } from './baseConfig';

export const createGetAll = (): ActionResult<CountriesMap> => () =>
    axiosInstance
        .get<Country[]>('/countries/all')
        .then(({ data }) => data)
        .then(data => mapCountries(data));
