import React from "react";

interface SelectProps {
    id: string;
    name: string;
    label?: string;
    value: string | number;
    options: { value: string | number; label: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    required?: boolean;
    onlyLabel?: boolean;
}

const Select: React.FC<SelectProps> = ({
    id,
    name,
    label,
    value,
    options,
    onChange,
    className = "",
    required = false,
    onlyLabel = false,
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
                    {label}
                </label>
            )}
            {!onlyLabel && (
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                    required={required}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default Select;