import React, { ChangeEvent } from 'react';
import './RadioButton.css';

interface RadioButtonProps {
    id: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
    name: string;
    title: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ id, checked,title, onChange, name }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e, name);
    }
    return (
        <div className='radioWrapper'>
            {title}
            <input
                type='radio'
                id={id}
                name={name}
                checked={checked}
                className='radioBtn'
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
}

export default RadioButton;
