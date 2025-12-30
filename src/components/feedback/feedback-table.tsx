'use client';

import { FunctionComponent, useCallback } from 'react';
import { ReviewWithFeedbackSection } from '@/db/queries/feedback';
import { deleteFeedback } from '@/actions';
import { feedbackColumns } from '@/columns';
import { ItemsTable, TableActions, TruncatedText, FeaturedFlag } from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';
import { formatDateFull } from '@/utils';

interface FeedbackTableProps {
  items: ReviewWithFeedbackSection[];
  count: number;
}

export const FeedbackTable: FunctionComponent<FeedbackTableProps> = ({ items, count }) => {
  const renderCell = useCallback(
    (feedback: ReviewWithFeedbackSection, columnKey: ColumnKey<ReviewWithFeedbackSection>) => {
      if (columnKey === 'actions') {
        return (
          <TableActions
            showPath={paths.feedbackDetailsByIdAdmin}
            editPath={paths.feedbackEditByIdAdmin}
            itemId={feedback.id}
            onDelete={deleteFeedback}
          />
        );
      }

      switch (columnKey) {
        case 'id':
          return <TruncatedText text={feedback.id} />;

        case 'review':
          return <TruncatedText text={feedback.review} />;

        case 'feedbackSection':
          return feedback.feedbackSection.title;

        case 'featured':
          return <FeaturedFlag featured={feedback.featured} />;

        case 'receivedAt':
          return formatDateFull(feedback.receivedAt);

        default:
          return feedback[columnKey];
      }
    },
    [],
  );

  return (
    <ItemsTable<ReviewWithFeedbackSection>
      items={items}
      count={count}
      title={'Feedback'}
      columns={feedbackColumns}
      renderCell={renderCell}
    />
  );
};
