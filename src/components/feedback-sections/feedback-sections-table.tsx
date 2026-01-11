'use client';

import { FunctionComponent, useCallback } from 'react';
import { FeedbackSectionWithReviews } from '@/db/queries/feedback-sections';
import { deleteFeedbackSection } from '@/actions';
import { feedbackSectionsColumns } from '@/columns';
import { ItemsTable, TableActions, TruncatedText } from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';

interface FeedbackSectionsTableProps {
  items: FeedbackSectionWithReviews[];
  count: number;
}

export const FeedbackSectionsTable: FunctionComponent<FeedbackSectionsTableProps> = ({
  items,
  count,
}) => {
  const renderCell = useCallback(
    (
      feedbackSection: FeedbackSectionWithReviews,
      columnKey: ColumnKey<FeedbackSectionWithReviews>,
    ) => {
      if (columnKey === 'actions') {
        return (
          <TableActions
            showPath={paths.feedbackSectionsDetailsByIdAdmin}
            editPath={paths.feedbackSectionsEditByIdAdmin}
            itemId={feedbackSection.id}
            onDelete={deleteFeedbackSection}
          />
        );
      }

      switch (columnKey) {
        case 'id':
          return <TruncatedText text={feedbackSection.id} />;

        case 'reviews':
          return feedbackSection.reviews.length;

        default:
          return feedbackSection[columnKey];
      }
    },
    [],
  );

  return (
    <ItemsTable<FeedbackSectionWithReviews>
      items={items}
      count={count}
      title={'Feedback Sections'}
      columns={feedbackSectionsColumns}
      renderCell={renderCell}
    />
  );
};
