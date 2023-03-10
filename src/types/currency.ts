export type Rate = {
    buy?: string;
    sell?: string;
};

export type Currency = {
    name?: string;
    abbreviation: string;
    exchangeRate: Rate;
    flag?: string;
};

export type Currencies = {
    baseCurrency: string;
    currencies: Currency[];
};
