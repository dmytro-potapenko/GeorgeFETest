import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import Search from '../components/Search/Search';
import { Store } from '../stores/store';

type SearchScreenProps = {
    store: Store;
};

const SearchScreen: FC<SearchScreenProps> = ({ store }) => {
    const {
        currencies: {
            list: { data: currencies, fetching },
            list,
        },
    } = store;

    useEffect(() => {
        list.get();
    }, []);

    return <Search currencies={currencies} fetching={fetching} fullScreen />;
};

const ObservedSearchScreen = observer(SearchScreen);

export default ObservedSearchScreen;
