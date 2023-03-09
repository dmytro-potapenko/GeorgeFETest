import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import SearchScreen from './screens/SearchScreen';
import { Store } from './stores/store';

const store = new Store();

const App = () => {
    return (
        <AppLayout>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<SearchScreen store={store} />} />
                    <Route path={'/not-found'} element={<>Page not found</>} />
                </Routes>
            </BrowserRouter>
        </AppLayout>
    );
};

export default App;
