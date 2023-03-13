import { EnrichedCurrency } from '../../../../types/search/currencies';
import { ReactFC } from '../../../../types/types';

type CurrencyExchangeRateProps = {
    currency: EnrichedCurrency;
    baseCurrency: string;
};

const CurrencyExchangeRate: ReactFC<CurrencyExchangeRateProps> = ({
    currency: {
        exchangeRate: { buy, sell },
    },
    baseCurrency,
}) => {
    if (!buy && !sell) {
        return <p className="right-data__no-data">No exchange data</p>;
    } else {
        return (
            <>
                <p>
                    {buy ?? '-'} / {sell ?? '-'}
                </p>
                <b>{baseCurrency}</b>
            </>
        );
    }
};

export default CurrencyExchangeRate;
