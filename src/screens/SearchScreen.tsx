import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import Search from '../components/Search/Search';
import { Store } from '../stores/store';

type SearchScreenProps = {
    store: Store;
};

const SearchScreen: FC<SearchScreenProps> = ({ store }) => {
    const {
        currenciesStore: {
            currenciesDataStore: { data: currenciesData, fetching },
            currenciesDataStore,
        },
    } = store;

    useEffect(() => {
        currenciesDataStore.get();
    }, []);

    return <Search data={currenciesData} fetching={fetching} />;
};

const ObservedSearchScreen = observer(SearchScreen);

export default ObservedSearchScreen;
