import { CurrenciesExternal } from '../types/currenciesExternal';
import { Currency } from '../types/currency';
import { ActionResult } from '../types/request';
import { mapCurrencies } from '../utils/currency';
import { axiosInstance } from './baseConfig';

export const createGet = (): ActionResult<Currency[]> => () =>
    axiosInstance
        .get<CurrenciesExternal>('/c88db14a-3128-4fbd-af74-1371c5bb0343')
        .then(config => mapCurrencies(config));
