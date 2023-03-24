const DAY_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isTomorrow = (date: Date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

export const isInPast = (date: Date) => {
  const today = new Date();
  return (
    date.getFullYear() < today.getFullYear() ||
    (date.getFullYear() === today.getFullYear() && date.getMonth() < today.getMonth()) ||
    (date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() < today.getDate())
  );
};

export const getDayOfWeek = (date: Date) => {
  const day = date.getDay();
  return DAY_OF_WEEK[day];
};
