import { TechnologySectionWithTechnologies } from '@/db/queries/technology-sections';
import { Column, ColumnKey } from '@/types';

export const columns: Column<ColumnKey<TechnologySectionWithTechnologies>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'title', label: 'Section', allowsSorting: true },
  { key: 'technologies', label: 'Technologies', allowsSorting: false },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
