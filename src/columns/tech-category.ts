import { TechCategoryWithStacks } from '@/db/queries/tech-categories';
import { Column, ColumnKey } from '@/types';

export const columns: Column<ColumnKey<TechCategoryWithStacks>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'title', label: 'Category', allowsSorting: true },
  { key: 'stacks', label: 'Stacks', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
