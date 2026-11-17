import { format } from 'date-fns';

const formatShortDate = (date) => {
  return format(date, 'dd.MM.yyyy');
};

const DateFormatter = {
  formatShortDate,
};

export default DateFormatter;
