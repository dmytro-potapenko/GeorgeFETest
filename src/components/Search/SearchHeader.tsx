import { useSearchDeepLinking } from '../../hooks/useSearchDeepLinking';
import { CY_LOCATORS } from '../../shared/cyLocators';
import { ReactFC } from '../../types/types';
import InputField from '../common/InputField';

type SearchHeaderProps = {
    value: string;
    onChange: (v: string) => void;
    baseCurrency: string;
};

const SearchHeader: ReactFC<SearchHeaderProps> = ({ value, onChange, baseCurrency }) => {
    const handleChange = useSearchDeepLinking('q', onChange);

    return (
        <div data-cy-id={CY_LOCATORS.STICKY_CONTAINER} className="sticky-container">
            <div className="search-input-container">
                <InputField
                    data-cy-id={CY_LOCATORS.STICKY_CONTAINER__SEARCH_INPUT}
                    value={value}
                    onChange={handleChange}
                    placeholder="Search..."
                />
            </div>
            <div data-cy-id={CY_LOCATORS.STICKY_CONTAINER__HEADER} className="items-header">
                <p
                    data-cy-id={CY_LOCATORS.STICKY_CONTAINER__HEADER__LEFT_TEXT}
                    className="currency"
                >
                    Currency
                </p>
                <p data-cy-id={CY_LOCATORS.STICKY_CONTAINER__HEADER__RIGHT_TEXT}>
                    Buy / Sell <b>{baseCurrency}</b>
                </p>
            </div>
        </div>
    );
};

export default SearchHeader;
