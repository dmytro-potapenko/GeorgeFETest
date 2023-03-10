import { AppError } from '../types/error';
import { Nullable } from '../types/types';
import { Props } from './withProps';

type AppErrorProps = {
    error: AppError;
    global?: boolean;
};

const AppError = ({ error, global }: AppErrorProps) => {
    const Error = () => (
        // <AppNotification status={AppNotificationType.Error} title={errorType(error.type)}>
        //     {error.message}
        // </AppNotification>
        <>{error.message}</>
    );

    return global ? (
        // <AppContainer>
        //     <ScreenContainer>
        //         <Error />
        //     </ScreenContainer>
        // </AppContainer>
        <>Error</>
    ) : (
        <Error />
    );
};

type WithErrorConfig = {
    global?: boolean;
};

export type WithErrorProps<TProps extends Props> = TProps & {
    error: Nullable<AppError>;
};

export function withError<P extends Props>({ global }: WithErrorConfig = {}) {
    return (Component: React.FC<P>): React.FC<WithErrorProps<P>> => {
        return ({ error, ...rest }: WithErrorProps<P>) => {
            return error ? <AppError error={error} global={global} /> : <Component {...(rest as unknown as P)} />;
        };
    };
}
