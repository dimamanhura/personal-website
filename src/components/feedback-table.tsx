'use client'

import { FunctionComponent, useCallback, useMemo } from "react";
import ItemsTable from "@/components/items-table";
import TableActions from "@/components/table-actions";
import { Column } from "@/types/Column";
import paths from "@/paths";
import TruncatedText from "./truncated-text";
import { deleteFeedback } from "@/actions/delete-feedback";
import FeaturedFlag from "./featured-flag";
import { ReviewWithFeedbackSection } from "@/db/queries/feedback";

interface FeedbackTableProps {
  items: ReviewWithFeedbackSection[];
  count: number;
};

const FeedbackTable: FunctionComponent<FeedbackTableProps> = ({
  items,
  count,
}) => {
  const title = 'Feedback';

  const columns: Column[] = useMemo(() => ([
    { key: 'id', label: 'ID', allowsSorting: true },
    { key: 'author', label: 'Author', allowsSorting: true },
    { key: 'feedbackSection', label: 'Section', allowsSorting: false },
    { key: 'review', label: 'Review', allowsSorting: true },
    { key: 'createdAt', label: 'Requested At', allowsSorting: true },
    { key: 'featured', label: 'Featured', allowsSorting: true },
    { key: "actions", label: "Actions", allowsSorting: false },
  ]), []);
  
  const renderCell = useCallback((feedback: any, columnKey: any) => {
    const cellValue = feedback[columnKey];

    switch (columnKey) {
      case 'id':
      case 'review':
        return <TruncatedText text={cellValue} />;

      case 'feedbackSection':
        return cellValue.title;

      case 'featured':
        return <FeaturedFlag featured={cellValue} />;

      case 'actions':
        return (
          <TableActions
            showPath={paths.feedbackDetails}
            editPath={paths.editFeedback}
            itemId={feedback.id}
            onDelete={deleteFeedback}
          />
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <ItemsTable
      items={items}
      count={count}
      title={title}
      columns={columns}
      renderCell={renderCell}
    />
  );
};

export default FeedbackTable;
