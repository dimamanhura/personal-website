import { formatDate } from "@/utils";

export const formatDateRange = (startAt: string, endAt?: string | null) => {
  const startAtDate = formatDate(startAt);
  const endAtDate = endAt ? formatDate(endAt) : 'Present';
  return `${startAtDate} - ${endAtDate}`;
};
