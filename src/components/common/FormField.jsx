const FormField = ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    children,
}) => {
    const inputClass = `
        w-full rounded-lg border px-3 py-2.5 outline-none transition
        ${
            touched && error
                ? "border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }
    `;

    return (
        <div>
            <label
                htmlFor={name}
                className="mb-1 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            {children || (
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={inputClass}
                />
            )}

            {touched && error && (
                <p className="mt-1 text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormField;