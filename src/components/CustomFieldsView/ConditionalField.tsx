import React, { useEffect, useState } from 'react';

const options = [
  { value: '', label: 'Choose an option' },
  {
    value: 'departments.computerScience',
    label: 'Кафедра інтелектуальних програмних систем і технологій',
  },
  {
    value: 'departments.cybersecurity',
    label: 'Кафедра кібербезпеки інформаційних систем, мереж і технологій',
  },
  {
    value: 'departments.mathAnalysis',
    label: 'Кафедра математичного моделювання та аналізу даних',
  },
  {
    value: 'departments.robotics',
    label: "Кафедра комп'ютерних систем та робототехніки",
  },
];

const ConditionalField = ({ input, field, form }) => {
  const parentValue = form.getState().values.category;
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      if (!form.getState().values.department) {
        input.onChange(null); // Встановлюємо null по замовчуванню
      }
    }
    setIsTouched(true);
  }, [form.getState().values.department]);

  const handleChange = (event) => {
    input.onChange(event.target.value);
  };

  const isAchievementCategory = parentValue === 'achievements';
  const isEmpty = isTouched && (!input.value || input.value.trim() === '');

  // Показувати текст "Required" тільки якщо обрана категорія "Досягнення" і поле порожнє
  const showRequired = isAchievementCategory && isEmpty;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      <select
        value={input.value || ''} // Показуємо пусту опцію, якщо значення null
        onChange={handleChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {showRequired && (
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

export default ConditionalField;
