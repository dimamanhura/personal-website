export interface Column<T> {
  key: T;
  label: string;
  allowsSorting: boolean;
};
