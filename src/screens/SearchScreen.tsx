import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import Search from '../components/Search/Search';
import { Store } from '../stores/store';
import { ReactFC } from '../types/types';

type SearchScreenProps = {
    store: Store;
};

const SearchScreen: ReactFC<SearchScreenProps> = ({ store }) => {
    const {
        searchStore: { ownFetching, enrichedCurrencies, error },
        searchStore,
    } = store;

    useEffect(() => {
        searchStore.getAll();
    }, []);

    return <Search data={enrichedCurrencies} fetching={ownFetching} error={error} />;
};

const ObservedSearchScreen = observer(SearchScreen);

export default ObservedSearchScreen;
