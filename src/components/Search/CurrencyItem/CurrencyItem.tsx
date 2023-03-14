import classNames from 'classnames';
import { CY_LOCATORS } from '../../../shared/cyLocators';
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
        <div
            data-cy-id={CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM}
            className={classNames('currency-item', 'mb-1')}
            key={abbreviation}
        >
            <div className="left-data">
                <CountryFlag currency={data} />
                <p
                    data-cy-id={CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM__INFO}
                    className="left-data__info"
                >
                    <CurrencyInfo currency={data} />
                </p>
            </div>
            <div
                data-cy-id={CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM__CURRENCY_RATE}
                className={classNames('right-data', 'ml-1')}
            >
                <CurrencyExchangeRate currency={data} baseCurrency={baseCurrency} />
            </div>
        </div>
    );
};

export default CurrencyItem;
