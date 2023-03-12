import { AppErrorScreen } from '../screens/InfoScreen';
import { AppError as AppErrorData } from '../types/error';
import { Nullable, Props, ReactFC } from '../types/types';

export type WithErrorProps<TProps extends Props> = TProps & {
    error: Nullable<AppErrorData>;
};

export function withError<P extends Props>() {
    return (Component: ReactFC<P>): ReactFC<WithErrorProps<P>> => {
        return ({ error, ...rest }: WithErrorProps<P>) => {
            return error ? <AppErrorScreen /> : <Component {...(rest as unknown as P)} />;
        };
    };
}
