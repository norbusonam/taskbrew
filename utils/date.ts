export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const DAYS = [
  {
    short: "Su",
    long: "Sunday",
  },
  {
    short: "Mo",
    long: "Monday",
  },
  {
    short: "Tu",
    long: "Tuesday",
  },
  {
    short: "We",
    long: "Wednesday",
  },
  {
    short: "Th",
    long: "Thursday",
  },
  {
    short: "Fr",
    long: "Friday",
  },
  {
    short: "Sa",
    long: "Saturday",
  },
];

export const getNumberOfDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const isPastDue = (date: Date) => {
  return date < new Date();
};

export const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toLocaleDateString() === yesterday.toLocaleDateString();
};

export const isToday = (date: Date) => {
  return date.toLocaleDateString() === new Date().toLocaleDateString();
};

export const isTomorrow = (date: Date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.toLocaleDateString() === tomorrow.toLocaleDateString();
};

export const isLaterThisWeek = (date: Date) => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  nextWeek.setHours(23, 59, 59);
  return date > today && date < nextWeek;
};

export const isThisYear = (date: Date) => {
  return date.getFullYear() === new Date().getFullYear();
};
