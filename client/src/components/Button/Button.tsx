import { FC, FormEvent } from 'react';
import './Button.css';

interface buttonProps {
    id: string;
    onClick?: (id: string) => void | ((e: FormEvent) => Promise<void>);
    disabled: boolean;
    children: string;
    loading: boolean;
    type: "submit" | "button";
}
const Button: FC<buttonProps> = ({
    id,
    onClick,
    disabled,
    children,
    loading,
    type
}) => {

    const handleClick = () => {
        if (onClick) onClick(id);
    };
    return (
        <button
            id={id}
            type={type}
            className="btn primary"
            disabled={loading ? true : disabled}
            onClick={() => handleClick()}
        >
            {loading ?
                <div className='loader'></div>
                : children}
        </button >
    );
};

export default Button;