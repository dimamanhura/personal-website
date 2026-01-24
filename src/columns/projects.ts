import { ProjectWithTech } from '@/db/queries/projects';
import { Column, ColumnKey } from '@/types';

export const columns: Column<ColumnKey<ProjectWithTech>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'name', label: 'Name', allowsSorting: true },
  { key: 'shortDescription', label: 'Description', allowsSorting: true },
  { key: 'position', label: 'Position', allowsSorting: true },
  { key: 'startAt', label: 'Period', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
