import classNames from 'classnames';
import { FC } from 'react';
import { Currency, Rate } from '../../types/currency';
import Visible from '../common/Visible';

const getExchangeRate = ({ buy, sell }: Rate, baseCurrency: string): JSX.Element => {
    if (buy && sell)
        return (
            <>
                {buy} / {sell} <b>{baseCurrency}</b>
            </>
        );
    if (!buy && sell)
        return (
            <>
                - / {sell} <b>{baseCurrency}</b>
            </>
        );
    if (buy && !sell)
        return (
            <>
                {buy} / - <b>{baseCurrency}</b>
            </>
        );
    return <>No currency data</>;
};

type CurrencyItemProps = {
    data: Currency;
    baseCurrency: string;
};

const CurrencyItem: FC<CurrencyItemProps> = ({ data, baseCurrency }) => {
    const { flag, abbreviation, exchangeRate } = data;

    return (
        <div className={classNames('currency-item', 'mb-1')} key={abbreviation}>
            <div className="currency-item--left">
                <Visible hidden={!flag}>
                    <img className={classNames('currency-item__flag', 'mr-1')} src={flag} alt="flag" />
                </Visible>
                <p
                    className={classNames('currency-item__abbreviation', {
                        'currency-item__abbreviation--no-flag': !flag,
                    })}
                >
                    {abbreviation}
                </p>
            </div>
            <p>{getExchangeRate(exchangeRate, baseCurrency)}</p>
        </div>
    );
};

export default CurrencyItem;
