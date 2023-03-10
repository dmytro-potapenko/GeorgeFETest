import { FC } from 'react';
import InputField from '../common/InputField';

type SearchHeaderProps = {
    value: string;
    onChange: (v: string) => void;
    baseCurrency: string;
};

const SearchHeader: FC<SearchHeaderProps> = ({ value, onChange, baseCurrency }) => {
    return (
        <div className="sticky-container">
            <div className="search-input-container">
                <p className="mr-1">SearchHeader</p>
                <InputField value={value} onChange={onChange} />
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
