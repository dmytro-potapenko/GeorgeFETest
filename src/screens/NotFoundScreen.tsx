import { FC } from 'react';
import { ReactComponent as GearsIcon } from '../assets/svg/gears.svg';

const NotFoundScreen: FC = () => (
    <div className="not-found-screen">
        <p className="mb-1">Page not found 😕</p>
        <GearsIcon />
    </div>
);

export default NotFoundScreen;
