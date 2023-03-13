import { EnrichedCurrency } from '../../../../types/search/currencies';
import { ReactFC } from '../../../../types/types';

type CurrencyInfoProps = {
    currency: EnrichedCurrency;
};

const CurrencyInfo: ReactFC<CurrencyInfoProps> = ({
    currency: { isCommon, name, countryName, abbreviation },
}) => {
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

export default CurrencyInfo;
