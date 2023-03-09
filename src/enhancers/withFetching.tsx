import { FC } from 'react';
import Spinner, { SpinnerProps } from '../components/common/Spinner';

import { Props } from '../types/types';

export type WithFetching<TProps extends Props> = TProps & Pick<SpinnerProps, 'fetching' | 'fullScreen'>;

export function withFetching<P extends Props>(Component: FC<P>): FC<WithFetching<P>> {
    return ({ fetching, fullScreen, ...rest }: WithFetching<P>) => (
        <Spinner fetching={fetching} fullScreen={fullScreen}>
            <Component {...(rest as unknown as P)} />
        </Spinner>
    );
}
