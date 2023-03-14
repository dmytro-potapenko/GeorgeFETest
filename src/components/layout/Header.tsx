import { CY_LOCATORS } from '../../shared/cyLocators';

const Header = () => (
    <header data-cy-id={CY_LOCATORS.HEADER}>
        <p data-cy-id={CY_LOCATORS.HEADER__LOGO_TEXT} className="logo">
            George FE Test
        </p>
    </header>
);

export default Header;
