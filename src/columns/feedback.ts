import { ReviewWithFeedbackSection } from '@/db/queries/feedback';
import { Column, ColumnKey } from '@/types';

export const columns: Column<ColumnKey<ReviewWithFeedbackSection>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'author', label: 'Author', allowsSorting: true },
  { key: 'feedbackSection', label: 'Section', allowsSorting: false },
  { key: 'review', label: 'Review', allowsSorting: true },
  { key: 'createdAt', label: 'Requested At', allowsSorting: true },
  { key: 'featured', label: 'Featured', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
