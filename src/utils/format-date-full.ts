export const formatDateFull = (date: Date | string) => {
  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};
