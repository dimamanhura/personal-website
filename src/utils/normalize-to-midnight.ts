export const normalizeToMidnight = (value: string | Date): Date => {
  const date = new Date(value);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};
