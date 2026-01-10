export type ColumnKey<T> = Extract<keyof T, string> | 'actions';
