import classNames from 'classnames';
import { ReactComponent as NoImageIcon } from '../../../../assets/svg/no-image.svg';
import { EnrichedCurrency } from '../../../../types/search/currencies';
import { ReactFC } from '../../../../types/types';

type CountryFlagProps = {
    currency: EnrichedCurrency;
};

const CountryFlag: ReactFC<CountryFlagProps> = ({ currency: { isCommon, flag } }) => {
    if (flag) {
        return <img className={classNames('left-data__flag', 'mr-1')} src={flag} alt="flag" />;
    } else {
        return isCommon ? (
            <div className={classNames('left-data__flag', 'left-data__flag--dumb', 'mr-1')}>
                <p>
                    Common
                    <br />
                    currency
                </p>
            </div>
        ) : (
            <div
                className={classNames(
                    'left-data__flag',
                    'left-data__flag--dumb',
                    'left-data__flag--no-image',
                    'mr-1'
                )}
            >
                <NoImageIcon />
            </div>
        );
    }
};

export default CountryFlag;
