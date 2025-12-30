import { Meta } from '@prisma/client';
import { Column, ColumnKey } from '@/types';

export const columns: Column<ColumnKey<Meta>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'firstName', label: 'Name', allowsSorting: true },
  { key: 'location', label: 'Location', allowsSorting: false },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
