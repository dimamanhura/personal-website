'use client'

import { FunctionComponent, useCallback } from "react";
import { ItemsTable, TableActions, TruncatedText, FeaturedFlag } from "@/components";
import { Column } from "@/types";
import paths from "@/paths";
import { deleteFeedback } from '@/actions';
import { ReviewWithFeedbackSection } from "@/db/queries/feedback";

interface FeedbackTableProps {
  items: ReviewWithFeedbackSection[];
  count: number;
};

type FeedbackKey = Extract<keyof ReviewWithFeedbackSection, string>;

type ColumnKey = FeedbackKey | 'actions';

const columns: Column<ColumnKey>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'author', label: 'Author', allowsSorting: true },
  { key: 'feedbackSection', label: 'Section', allowsSorting: false },
  { key: 'review', label: 'Review', allowsSorting: true },
  { key: 'createdAt', label: 'Requested At', allowsSorting: true },
  { key: 'featured', label: 'Featured', allowsSorting: true },
  { key: "actions", label: "Actions", allowsSorting: false },
];

export const FeedbackTable: FunctionComponent<FeedbackTableProps> = ({
  items,
  count,
}) => {
  const renderCell = useCallback((feedback: ReviewWithFeedbackSection, columnKey: ColumnKey) => {
    if (columnKey === 'actions') {
      return (
        <TableActions
          showPath={paths.feedbackDetails}
          editPath={paths.editFeedback}
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

      default:
        return feedback[columnKey];
    }
  }, []);

  return (
    <ItemsTable
      items={items}
      count={count}
      title={'Feedback'}
      columns={columns}
      renderCell={renderCell as unknown as <T, K>(item: T, columnKey: K) => JSX.Element}
    />
  );
};
