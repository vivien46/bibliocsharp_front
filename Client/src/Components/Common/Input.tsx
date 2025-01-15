import React from "react";

interface InputProps {
    id: string;
    name: string;
    label: string;
    type?: "text" | "email" | "password" | "number" | "search" | "date";
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    style?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
    id,
    name,
    label,
    type = "text",
    value,
    onChange,
    onBlur,
    onFocus,
    placeholder = "",
    className = "",
    required = false,
    inputRef,
    style,
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block mb-2 text-sm font-medium">
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                value={value || ""}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                placeholder={placeholder}
                ref={inputRef}
                className="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                required={required}
                style={style}
            />
        </div>
    );
};

export default Input;