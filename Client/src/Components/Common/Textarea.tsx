import React from 'react';

interface TextareaProps {
    label: string;
    id?: string;
    name: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
    rows?: number;
    cols?: number;
    rest?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const Textarea: React.FC<TextareaProps> = ({
    label,
    id,
    name,
    value,
    onChange,
    placeholder = "",
    className = "",
    required = false,
    rows = 5,
    cols = 50,
    ...rest
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block mb-2 text-sm font-medium">
                {label}
            </label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                required={required}
                rows={rows}
                cols={cols}
                {...rest}
            />
        </div>
    );
};

export default Textarea;