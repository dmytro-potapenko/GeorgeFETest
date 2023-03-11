import { pipe } from 'fp-ts/lib/function';
import { observer } from 'mobx-react-lite';
import { FC, useMemo, useState } from 'react';
import { withFetching } from '../../enhancers/withFetching';
import { withNoData } from '../../enhancers/withNoData';
import { EnrichedCurrencies, EnrichedCurrency } from '../../types/search/currencies';
import { filterCurrencies } from '../../utils/currencies';
import { SpinnerType } from '../common/Spinner/Spinner';
import CurrencyItem from './CurrencyItem';
import SearchHeader from './SearchHeader';

type SearchProps = {
    data: EnrichedCurrencies;
};

const Search: FC<SearchProps> = ({ data }) => {
    const { baseCurrency, currencies } = data;

    const [searchValue, setSearchValue] = useState<string>('');

    const filteredCurrencies: EnrichedCurrency[] = useMemo(
        () => filterCurrencies(currencies, searchValue),
        [currencies, searchValue]
    );

    return (
        <div className="search-screen-container">
            <SearchHeader value={searchValue} onChange={setSearchValue} baseCurrency={baseCurrency} />
            <div className="search-items-container">
                {filteredCurrencies.map(item => (
                    <CurrencyItem key={item.abbreviation} data={item} baseCurrency={baseCurrency} />
                ))}
            </div>
        </div>
    );
};

const ObservedSearch = pipe(
    Search,
    observer,
    withNoData<SearchProps, 'data'>(p => p.data),
    withFetching({ spinnerType: SpinnerType.Screen })
);

export default ObservedSearch;
