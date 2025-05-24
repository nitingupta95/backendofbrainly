import { ReactElement } from "react";
import React from "react"

interface ButtonProps {
    variants: 'primary' | 'secondary';
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
}

const variantsClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-purple-300 text-purple-600 hover:bg-purple-400',
};

const defaultStyles = 'px-4 py-2 rounded-md font-medium transition duration-200';

function Button({
    variants,
    text,
    startIcon,
    onClick,
    fullWidth = false,
    loading = false,
    disabled = false,
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={loading || disabled}
            className={`${variantsClasses[variants]} ${defaultStyles} ${
                fullWidth ? 'w-full' : ''
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <div className="flex items-center justify-center gap-2">
                {startIcon}
                {text}
            </div>
        </button>
    );
}

export default Button;
