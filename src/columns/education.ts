import { Column, ColumnKey } from '@/types';
import { Education } from '@prisma/client';

export const columns: Column<ColumnKey<Education>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'name', label: 'Name', allowsSorting: true },
  { key: 'location', label: 'Location', allowsSorting: true },
  { key: 'startAt', label: 'Start At', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
