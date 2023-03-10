import { Optional } from '../types/types';
import { Props } from './withProps';

export type WithVisibility<TProps extends Props> = TProps & {
    hidden?: Optional<boolean>;
};

export function withVisibility<P extends Props>() {
    return function (Component: React.FC<P>): React.FC<WithVisibility<P>> {
        return ({ hidden, ...rest }: WithVisibility<P>) => (!hidden ? <Component {...(rest as unknown as P)} /> : null);
    };
}
