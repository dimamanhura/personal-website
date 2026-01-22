import { TechStackWithTools } from '@/db/queries/tech-stacks';
import { Column, ColumnKey } from '@/types';

export const columns: Column<ColumnKey<TechStackWithTools>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'title', label: 'Stack', allowsSorting: true },
  { key: 'displayOrder', label: 'Order', allowsSorting: true },
  { key: 'category', label: 'Category', allowsSorting: true },
  { key: 'featured', label: 'Featured', allowsSorting: true },
  { key: 'tools', label: 'Tools', allowsSorting: false },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
