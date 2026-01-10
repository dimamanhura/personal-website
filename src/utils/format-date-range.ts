import { formatDate } from '@/utils';

export const formatDateRange = (startAt: Date | string, endAt?: Date | string | null) => {
  const startAtDate = formatDate(startAt);
  const endAtDate = endAt ? formatDate(endAt) : 'Present';
  return `${startAtDate} - ${endAtDate}`;
};
