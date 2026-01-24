export const getDurationInYears = (startAt: Date, endAt: Date | null) => {
  const startDate = new Date(startAt);
  const endDate = endAt ? new Date(endAt) : new Date();
  const diffYears = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

  return diffYears.toFixed(1);
};
