import React, { ChangeEvent } from 'react';
import './TextInput.css';

interface InputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const TextInput: React.FC<InputProps> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="form-input"
      />
    </div>
  );
};

export default TextInput;
