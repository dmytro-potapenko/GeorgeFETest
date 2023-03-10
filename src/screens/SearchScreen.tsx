import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import Search from '../components/Search/Search';
import { Store } from '../stores/store';

type SearchScreenProps = {
    store: Store;
};

const SearchScreen: FC<SearchScreenProps> = ({ store }) => {
    const {
        searchStore: { ownFetching, enrichedCurrencies },
        searchStore,
    } = store;

    useEffect(() => {
        searchStore.getAll();
    }, []);

    return <Search data={enrichedCurrencies} fetching={ownFetching} />;
};

const ObservedSearchScreen = observer(SearchScreen);

export default ObservedSearchScreen;
