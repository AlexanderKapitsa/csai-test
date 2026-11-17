import React, { useEffect } from 'react';

const ToggleInput = ({ input, field, form }) => {
    const parentValue = form.getState().values.category;
    const handleChange = (event) => {
        const newValue = event.target.checked ? true : false;
        input.onChange(newValue);
    };

    // Завжди встановлюємо значення "false" за замовчуванням, якщо воно ще не встановлене
    useEffect(() => {
        if (!input.value) {
            input.onChange(false);
        }
    }, [input]);

    return (
        <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium text-gray-700 mr-2">
                {field.label}
            </label>
            <input
                type="checkbox"
                checked={input.value === true}
                onChange={handleChange}
                className="toggle-checkbox w-6 h-6 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-indigo-500"
            />
        </div>
    );
};

export default ToggleInput;