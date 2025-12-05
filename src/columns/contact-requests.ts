import { ContactRequest } from '@prisma/client';
import { Column } from '@/types';
import { ColumnKey } from '@/types';

export const columns: Column<ColumnKey<ContactRequest>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'name', label: 'Name', allowsSorting: true },
  { key: 'email', label: 'Email', allowsSorting: true },
  { key: 'message', label: 'Message', allowsSorting: true },
  { key: 'createdAt', label: 'Requested At', allowsSorting: true },
  { key: 'resolved', label: 'Resolved', allowsSorting: true },
  { key: 'resolution', label: 'Resolution', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
