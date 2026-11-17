import React, { useEffect, useState } from 'react';

const setDefaultField = (input, key) => input.onChange(key);

const categoryOptions = [
    { value: '', label: 'Choose an option' },
    { value: 'education', label: 'Освіта' },
    { value: 'culture', label: 'Культура' },
    { value: 'science', label: 'Наука' },
    { value: 'international', label: 'Міжнародна діяльність' },
    { value: 'achievements', label: 'Досягнення' },
    { value: 'projects', label: 'Проєкти' },
];

const CustomSelect = ({ input, field, form }) => {

    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isTouched, setIsTouched] = useState(false);

    const isEmpty = isTouched && !form.getState().values.category;
    // Set default value if no option is selected
    const value = input.value || '';

    // Effect to set value to null if no value is selected
    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
        }
        setIsTouched(true);
    }, [form.getState().values.category]);

    const handleChange = (event) => {
        input.onChange(event.target.value);
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
            </label>
            <select
                value={input.value}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {isEmpty && (
                <span
                    className={
                        'block font-sans text-xs font-normal text-red-500 pt-3 animate-slide-in whitespace-normal m-0  undefined'
                    }
                >
                    Required
                </span>
            )}
        </div>
    );
};

export default CustomSelect;