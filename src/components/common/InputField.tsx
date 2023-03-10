import { FC } from 'react';

export type InputFieldProps = {
    value?: string;
    onChange?: (v: string) => void;
};

const InputField: FC<InputFieldProps> = ({ value, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value);

    return <input className="input-field" type="text" value={value} onChange={handleChange} />;
};

export default InputField;
