export type RateExternal = {
    buy?: number;
    indicator?: number;
    middle?: number;
    sell?: number;
    // meta
    lastModified?: string;
};

export type FxItem = {
    nameI18N?: string;
    currency: string;
    banknoteRate?: RateExternal;
    exchangeRate?: RateExternal;
    denominations?: number[];
    precision: number;
    flags?: string[];
};

export type CurrenciesExternal = {
    baseCurrency: string;
    fx: FxItem[];
    // meta
    institute: number;
    comparisonDate: string;
    lastUpdated: string;
};
