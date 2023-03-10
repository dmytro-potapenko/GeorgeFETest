import { ActionResult } from '../types/request';
import { Currencies } from '../types/search/currencies';
import { CurrenciesExternal } from '../types/search/currenciesExternal';
import { mapCurrencies } from '../utils/currencies';
import { axiosInstance } from './baseConfig';

export const createGetAll = (): ActionResult<Currencies> => () =>
    axiosInstance
        .get<CurrenciesExternal>('/currencies/c88db14a-3128-4fbd-af74-1371c5bb0343')
        .then(({ data }) => data)
        .then(config => mapCurrencies(config));
