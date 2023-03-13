import { ReactFC } from '../../types/types';

export type InputFieldProps = {
    value?: string;
    onChange?: (v: string) => void;
    placeholder?: string;
};

const InputField: ReactFC<InputFieldProps> = ({ value, onChange, placeholder }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value);

    return (
        <input
            className="input-field"
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
};

export default InputField;
