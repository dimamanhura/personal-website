import { TechnologyWithStack } from '@/db/queries/technologies';
import { Column, ColumnKey } from '@/types';

export const columns: Column<ColumnKey<TechnologyWithStack>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'title', label: 'Title', allowsSorting: true },
  { key: 'stack', label: 'Stack', allowsSorting: true },
  { key: 'featured', label: 'Featured', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
