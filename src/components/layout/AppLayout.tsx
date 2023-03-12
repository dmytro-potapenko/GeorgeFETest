import { ReactFC } from '../../types/types';
import Header from './Header';

const AppLayout: ReactFC = ({ children }) => (
    <div className="app">
        <Header />
        <div className="screen-container">{children}</div>
    </div>
);

export default AppLayout;
