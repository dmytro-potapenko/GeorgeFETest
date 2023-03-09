import { FC } from 'react';

import { Optional, Props } from '../types/types';

export type WithNoData<TProps extends Props, K extends keyof TProps> = {
    [k in K]?: Optional<TProps[K]>;
} & Omit<TProps, K>;

export function withNoData<P extends Props, K extends keyof P>(dataGetter: (p: WithNoData<P, K>) => Optional<P[K]>) {
    return (Component: FC<P>): FC<WithNoData<P, K>> =>
        (props: WithNoData<P, K>) => {
            const data = dataGetter(props);
            if (data !== null && data !== undefined) return <Component {...(props as unknown as P)} />;
            return null;
        };
}
