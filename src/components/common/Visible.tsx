import { pipe } from 'fp-ts/lib/function';
import { FC, PropsWithChildren } from 'react';
import { withVisibility } from '../../enhancers/withVisibility';

const Container: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

const Visible = pipe(Container, withVisibility());

export default Visible;
