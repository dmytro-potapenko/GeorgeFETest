import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type UseSearchDeepLinking = (v: string) => void;

export const useSearchDeepLinking = (
    searchKey: string,
    setSearchValue: (v: string) => void
): UseSearchDeepLinking => {
    const [queryString, setSearchParams] = useSearchParams();

    const handleChange = (value: string) => {
        setSearchValue(value);
        setSearchParams({ [searchKey]: value });
    };

    useEffect(() => {
        const keyWord = queryString.get(searchKey);
        if (keyWord) handleChange(keyWord);
    }, []);

    return handleChange;
};
