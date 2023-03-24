export const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};
