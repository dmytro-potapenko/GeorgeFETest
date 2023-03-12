import { ReactComponent as SpinnerIcon } from '../../../assets/svg/spinner.svg';
import { ReactFC } from '../../../types/types';
import SpinnerContainerStyled from './SpinnerContainer.styled';

export enum SpinnerType {
    Screen = 'Screen',
    Default = 'Default',
}

export type SpinnerProps = {
    type?: SpinnerType;
};

const Spinner: ReactFC<SpinnerProps> = ({ type }) => (
    <SpinnerContainerStyled type={type}>
        <SpinnerIcon />
    </SpinnerContainerStyled>
);

export default Spinner;
