export type Rate = {
    buy?: string;
    sell?: string;
};

export type Currency = {
    name?: string;
    abbreviation: string;
    exchangeRate: Rate;
    alpha2Code: string;
    flag?: string;
};

export type EnrichedCurrency = Currency & {
    countryName: string;
    isCommon: boolean;
};

export type Currencies = {
    baseCurrency: string;
    currencies: Currency[];
};

export type EnrichedCurrencies = Pick<Currencies, 'baseCurrency'> & {
    currencies: EnrichedCurrency[];
};
