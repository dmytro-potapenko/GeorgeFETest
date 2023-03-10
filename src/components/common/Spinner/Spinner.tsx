import { FC } from 'react';
import spinner from '../../../assets/svg/spinner.svg';
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
        <img src={spinner} alt="spinner" />
    </SpinnerContainerStyled>
);

export default Spinner;
