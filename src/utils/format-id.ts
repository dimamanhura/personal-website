export const formatId = (id: string): string => {
  const MAX_LENGTH = 6;
  if (id.length <= MAX_LENGTH) {
    return id;
  }
  return `${id.slice(0, MAX_LENGTH)}...`;
};
