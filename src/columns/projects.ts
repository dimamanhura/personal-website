import { Column, ColumnKey } from '@/types';
import { Project } from '@prisma/client';

export const columns: Column<ColumnKey<Project>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'name', label: 'Name', allowsSorting: true },
  { key: 'shortDescription', label: 'Description', allowsSorting: true },
  { key: 'position', label: 'Position', allowsSorting: true },
  { key: 'startAt', label: 'startAt', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
