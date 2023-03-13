import classNames from 'classnames';
import { EnrichedCurrency } from '../../../types/search/currencies';
import { ReactFC } from '../../../types/types';
import CountryFlag from './components/CountryFlag';
import CurrencyExchangeRate from './components/CurrencyExchangeRate';
import CurrencyInfo from './components/CurrencyInfo';

type CurrencyItemProps = {
    data: EnrichedCurrency;
    baseCurrency: string;
};

const CurrencyItem: ReactFC<CurrencyItemProps> = ({ data, baseCurrency }) => {
    const { abbreviation } = data;

    return (
        <div className={classNames('currency-item', 'mb-1')} key={abbreviation}>
            <div className="left-data">
                <CountryFlag currency={data} />
                <p className="left-data__info">
                    <CurrencyInfo currency={data} />
                </p>
            </div>
            <div className={classNames('right-data', 'ml-1')}>
                <CurrencyExchangeRate currency={data} baseCurrency={baseCurrency} />
            </div>
        </div>
    );
};

export default CurrencyItem;
