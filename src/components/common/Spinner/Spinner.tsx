import { ReactComponent as SpinnerIcon } from '../../../assets/svg/spinner.svg';
import { CY_LOCATORS } from '../../../shared/cyLocators';
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
        <SpinnerIcon data-cy-id={CY_LOCATORS.SPINNER} />
    </SpinnerContainerStyled>
);

export default Spinner;
