const DEFAULT_MAX_LENGTH = 10;

export const truncateText = (text: string, maxLength = DEFAULT_MAX_LENGTH): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
};
