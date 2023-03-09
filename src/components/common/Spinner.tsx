import { FC, PropsWithChildren } from 'react';
import spinner from '../../assets/svg/spinner.svg';

export type SpinnerProps = PropsWithChildren<{
    fetching?: boolean;
    fullScreen?: boolean;
}>;

const Spinner: FC<SpinnerProps> = ({ fetching, fullScreen, children }) =>
    fetching ? (
        <div className={`spinner-container ${fullScreen ? 'full-screen' : ''}`}>
            <img src={spinner} alt="spinner" />
        </div>
    ) : (
        <>{children}</>
    );

export default Spinner;
