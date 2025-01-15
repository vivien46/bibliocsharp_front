import React from 'react';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    className?: string;
    disabled?: boolean;
    [key: string]: any; // Permet de capturer des props supplémentaires, sauf `key`
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    className = '',
    disabled = false,
    ...rest // Capture toutes les props supplémentaires
}) => {
    const baseStyles = "px-4 py-2 font-medium rounded focus:outline-none focus:ring transition duration-150";
    const variantStyles = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-300 text-gray-600 hover:bg-gray-400",
        success: "bg-green-500 text-white hover:bg-green-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600",
        info: "bg-blue-500 text-white hover:bg-blue-600",
        light: "bg-gray-200 text-gray-600 hover:bg-gray-300",
        dark: "bg-gray-800 text-white hover:bg-gray-900",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles}  ${className || variantStyles[variant]}`}
            disabled={disabled}
            {...rest} // Applique les props supplémentaires
        >
            {children}
        </button>
    );
};

export default Button;