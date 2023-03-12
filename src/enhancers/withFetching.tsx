import Spinner, { SpinnerType } from '../components/common/Spinner/Spinner';

import { Props, ReactFC } from '../types/types';

export type WithFetchingProps<TProps extends Props> = TProps & {
    fetching: boolean;
};

type WithFetchingConfig = {
    spinnerType?: SpinnerType;
};

export function withFetching<P extends Props>({ spinnerType }: WithFetchingConfig = {}) {
    return (Component: ReactFC<P>): ReactFC<WithFetchingProps<P>> => {
        return ({ fetching, ...rest }: WithFetchingProps<P>) =>
            fetching ? <Spinner type={spinnerType} /> : <Component {...(rest as unknown as P)} />;
    };
}
