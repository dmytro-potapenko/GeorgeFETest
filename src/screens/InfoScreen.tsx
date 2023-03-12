import { pipe } from 'fp-ts/lib/function';
import { ReactComponent as GearsIcon } from '../assets/svg/gears.svg';
import { withProps } from '../enhancers/withProps';
import { ReactFC } from '../types/types';

export const InfoScreen: ReactFC = ({ children }) => (
    <div className="info-screen">
        <p className="mb-1">{children}</p>
        <GearsIcon />
    </div>
);

export const NotFoundScreen = pipe(InfoScreen, withProps({ children: 'Page not found 😕' }));
export const AppErrorScreen = pipe(
    InfoScreen,
    withProps({
        children: (
            <>
                Oops...
                <br />
                Something went wrong 🙈
                <br />
                Please try again later
            </>
        ),
    })
);
export const ErrorBoundaryScreen = pipe(
    InfoScreen,
    withProps({
        children: (
            <>
                Application is currently unavailable 🥲 <br /> Please try again later
            </>
        ),
    })
);
