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

export const HOURS = [
  "12 AM",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
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

export const getTimeFromDate = (date: Date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const parseTimeInputToDate = (time: string) => {
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5]\d\s?(am|pm|a|p)?$/i;
  const match = time.match(timeRegex);
  if (!match) return null;
  const [hour, minute] = match[0].split(":");
  const isPm = match[2] && match[2].toLowerCase().startsWith("p");
  const date = new Date();
  if (hour === "12") {
    date.setHours(isPm ? 12 : 0);
  } else {
    date.setHours(isPm ? parseInt(hour) + 12 : parseInt(hour));
  }
  date.setMinutes(parseInt(minute));
  return date;
};
