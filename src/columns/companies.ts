import { Company } from '@prisma/client';
import { Column, ColumnKey } from '@/types';

export const columns: Column<ColumnKey<Company>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'name', label: 'Name', allowsSorting: true },
  { key: 'position', label: 'Position', allowsSorting: true },
  { key: 'startAt', label: 'Start At', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
