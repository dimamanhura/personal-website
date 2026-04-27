import { ContactRequest } from '@prisma/client';
import { Column, ColumnKey } from '@/types';

export const columns: Column<ColumnKey<ContactRequest>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'name', label: 'Name', allowsSorting: true },
  { key: 'email', label: 'Email', allowsSorting: true },
  { key: 'classification', label: 'Classification', allowsSorting: true },
  { key: 'resolved', label: 'Resolved', allowsSorting: true },
  { key: 'createdAt', label: 'Requested At', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
