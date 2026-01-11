import { FeedbackSectionWithReviews } from '@/db/queries/feedback-sections';
import { Column, ColumnKey } from '@/types';

export const columns: Column<ColumnKey<FeedbackSectionWithReviews>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'title', label: 'Title', allowsSorting: true },
  { key: 'reviews', label: 'Reviews', allowsSorting: false },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
