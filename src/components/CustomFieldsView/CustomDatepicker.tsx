import React, { forwardRef, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/locale/uk';
import 'react-datepicker/dist/react-datepicker.css';
import { createGlobalStyle } from 'styled-components';
import DateFormatter from '../../utils/date-formatter';

registerLocale('uk', uk);

const DatePickerWrapperStyles = createGlobalStyle`
  .react-datepicker-popper {
    z-index: 9999 !important;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }
`;

const CustomDatepicker = ({ input, field }) => {
  const [date, setDate] = (() => {
    const [date, setDate] = useState(input.value || new Date());

    const setDateWithUTCMidday = (date) => {
      date = new Date(date);

      date.setUTCHours(12);
      date.setUTCMinutes(0);
      date.setUTCSeconds(0);
      date.setUTCMilliseconds(0);

      setDate(date);
    };

    return [date, setDateWithUTCMidday];
  })();

  useEffect(() => {
    input.onChange(date);
  }, [date]);

  const CustomInput = forwardRef(({ onClick }, ref) => (
    <input
      type="text"
      value={DateFormatter.formatShortDate(date)}
      onClick={onClick}
      ref={ref}
      readOnly={true}
      className={
        'shadow-inner focus:shadow-outline focus:border-blue-500 focus:outline-none block text-base placeholder:text-gray-300 px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150 focus:text-gray-900 rounded-md undefined'
      }
    />
  ));

  return (
    <div className={'relative mb-5 last:mb-0'}>
      <label className="block font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2 undefined">
        {field.label}
      </label>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date[0])}
        dateFormat={'dd.MM.yyyy'}
        locale={'uk'}
        customInput={<CustomInput />}
        icon={null}
        selectsMultiple={true}
        maxDate={new Date()}
      />
      <DatePickerWrapperStyles />
    </div>
  );
};

export default CustomDatepicker;
