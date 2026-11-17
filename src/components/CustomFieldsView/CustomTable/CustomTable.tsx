import React, { useRef } from 'react';
import TableEngine from './TableEngine';

const CustomTable = ({ input, field }) => {
  const initialData = useRef<string>(input.value);

  const handleTableChange = (data: string) => {
    input.onChange(data);
  };

  return (
    <div className={'relative mb-5 last:mb-0'}>
      <label
        htmlFor="alt"
        className="block font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2 undefined"
      >
        {field.label}
        <span className="block font-sans text-xs italic font-light text-gray-400 pt-0.5 whitespace-normal m-0 undefined">
          {field.description}
        </span>
      </label>
      <TableEngine
        initialData={initialData.current}
        setInput={handleTableChange}
      />
    </div>
  );
};
export default CustomTable;
