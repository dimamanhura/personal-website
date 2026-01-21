import { TechStackWithTechnologies } from '@/db/queries/tech-stacks';
import { Column, ColumnKey } from '@/types';

export const columns: Column<ColumnKey<TechStackWithTechnologies>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'title', label: 'Stack', allowsSorting: true },
  { key: 'technologies', label: 'Technologies', allowsSorting: false },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
