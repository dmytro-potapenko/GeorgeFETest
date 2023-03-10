import { FC } from 'react';
import { ReactComponent as SpinnerIcon } from '../../../assets/svg/spinner.svg';
import SpinnerContainerStyled from './SpinnerContainer.styled';

export enum SpinnerType {
    Screen = 'Screen',
    Default = 'Default',
}

export type SpinnerProps = {
    type?: SpinnerType;
};

const Spinner: FC<SpinnerProps> = ({ type }) => (
    <SpinnerContainerStyled type={type}>
        <SpinnerIcon />
    </SpinnerContainerStyled>
);

export default Spinner;
