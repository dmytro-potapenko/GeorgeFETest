export type Rate = {
    buy?: number;
    sell?: number;
};

export type Currency = {
    name?: string;
    abbreviation: string;
    exchangeRate: Rate;
    flag?: string;
};
