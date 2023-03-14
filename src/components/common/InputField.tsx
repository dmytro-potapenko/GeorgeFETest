import { ReactFC } from '../../types/types';

export type InputFieldProps = {
    'data-cy-id'?: string;
    value?: string;
    onChange?: (v: string) => void;
    placeholder?: string;
};

const InputField: ReactFC<InputFieldProps> = props => {
    const { value, onChange, placeholder } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value);

    return (
        <input
            data-cy-id={props['data-cy-id']}
            className="input-field"
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
};

export default InputField;
