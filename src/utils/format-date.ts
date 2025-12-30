export const formatDate = (date: Date | string) => {
  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
};
