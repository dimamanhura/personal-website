export const formatDateForInput = (date: Date | string | null | undefined): string | undefined => {
  if (!date) {
    return undefined;
  }

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return undefined;
  }

  return d.toISOString().split('T')[0];
};
