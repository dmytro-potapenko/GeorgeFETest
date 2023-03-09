import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { withFetching } from '../../enhancers/withFetching';
import { Currency } from '../../types/currency';

type SearchProps = {
    currencies: Currency[];
};

const Search: FC<SearchProps> = ({ currencies }) => {
    return <>{JSON.stringify(currencies)}</>;
};

const ObservedSearch = withFetching(observer(Search));

export default ObservedSearch;
