import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Spinner from './components/common/Spinner/Spinner';
import AppLayout from './components/layout/AppLayout';
import NotFoundScreen from './screens/NotFoundScreen';
import { Store } from './stores/store';

const SearchScreen = lazy(() => import('./screens/SearchScreen'));

const store = new Store();

const App = () => {
    return (
        <AppLayout>
            <Router>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path={'/'} element={<SearchScreen store={store} />} />
                        <Route path={'*'} element={<NotFoundScreen />} />
                    </Routes>
                </Suspense>
            </Router>
        </AppLayout>
    );
};

export default App;
