import { pipe } from 'fp-ts/lib/function';
import { withVisibility } from '../../enhancers/withVisibility';
import { ReactFC } from '../../types/types';

const Container: ReactFC = ({ children }) => <>{children}</>;

const Visible = pipe(Container, withVisibility());

export default Visible;
