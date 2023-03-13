import { Optional, Props, ReactFC } from '../types/types';

export type WithVisibility<TProps extends Props> = TProps & {
    hidden?: Optional<boolean>;
};

export function withVisibility<P extends Props>() {
    return function (Component: ReactFC<P>): ReactFC<WithVisibility<P>> {
        return ({ hidden, ...rest }: WithVisibility<P>) =>
            !hidden ? <Component {...(rest as unknown as P)} /> : null;
    };
}
