import { useSearchDeepLinking } from '../../hooks/useSearchDeepLinking';
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
        <div className="sticky-container">
            <div className="search-input-container">
                <InputField value={value} onChange={handleChange} placeholder="Search..." />
            </div>
            <div className="items-header">
                <p className="currency">Currency</p>
                <p>
                    Buy / Sell <b>{baseCurrency}</b>
                </p>
            </div>
        </div>
    );
};

export default SearchHeader;
