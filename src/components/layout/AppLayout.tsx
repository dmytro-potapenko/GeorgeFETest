import { FC, PropsWithChildren } from 'react';
import Header from './Header';

const AppLayout: FC<PropsWithChildren> = ({ children }) => (
    <div className="app">
        <Header />
        <div className="screen-container">{children}</div>
    </div>
);

export default AppLayout;
