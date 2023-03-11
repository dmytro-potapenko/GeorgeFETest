import classNames from 'classnames';
import { FC } from 'react';
import { ReactComponent as NoImageIcon } from '../../assets/svg/no-image.svg';
import { EnrichedCurrency } from '../../types/search/currencies';

const getExchangeRate = ({ exchangeRate: { buy, sell } }: EnrichedCurrency, baseCurrency: string): JSX.Element => {
    if (buy && sell)
        return (
            <>
                <p>
                    {buy} / {sell}
                </p>
                <b>{baseCurrency}</b>
            </>
        );
    if (!buy && sell)
        return (
            <>
                <p>- / {sell}</p>
                <b>{baseCurrency}</b>
            </>
        );
    if (buy && !sell)
        return (
            <>
                <p>{buy} / -</p>
                <b>{baseCurrency}</b>
            </>
        );

    return <p className="currency-item--no-data">No exchange data</p>;
};

const getCurrencyInfo = ({ isCommon, name, countryName, abbreviation }: EnrichedCurrency): JSX.Element => {
    if (isCommon) {
        return <b>{abbreviation}</b>;
    } else {
        return (
            <>
                {countryName} ({`${name ? name + ' - ' : ''}`}
                <b>{abbreviation}</b>)
            </>
        );
    }
};

const getFlag = ({ isCommon, flag }: EnrichedCurrency): JSX.Element => {
    if (flag) {
        return <img className={classNames('currency-item__flag', 'mr-1')} src={flag} alt="flag" />;
    } else {
        return isCommon ? (
            <div className={classNames('dumb-flag', 'mr-1')}>
                <p>
                    Common
                    <br />
                    currency
                </p>
            </div>
        ) : (
            <div className={classNames('dumb-flag', 'dumb-flag--no-image', 'mr-1')}>
                <NoImageIcon />
            </div>
        );
    }
};

type CurrencyItemProps = {
    data: EnrichedCurrency;
    baseCurrency: string;
};

const CurrencyItem: FC<CurrencyItemProps> = ({ data, baseCurrency }) => {
    const { abbreviation } = data;

    return (
        <div className={classNames('currency-item', 'mb-1')} key={abbreviation}>
            <div className="currency-item--left">
                {getFlag(data)}
                <p className="currency-item__info">{getCurrencyInfo(data)}</p>
            </div>
            <div className={classNames('currency-item--right', 'ml-1')}>{getExchangeRate(data, baseCurrency)}</div>
        </div>
    );
};

export default CurrencyItem;
