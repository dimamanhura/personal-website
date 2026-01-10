'use client';

import { createFeedbackBulk } from '@/actions';
import { ImportDataButton } from '@/components';
import { feedbackInputSchema } from '@/schemas';

export const FeedbackImportButton = () => {
  return (
    <ImportDataButton
      title="Feedback"
      schema={feedbackInputSchema}
      onImport={createFeedbackBulk}
      renderLabel={(item, idx) =>
        item.author && item.section ? (
          <div className="flex flex-col gap-1">
            <h2>{item.author}</h2>
            <p className="text-tiny font-normal text-foreground-400">{item.review}</p>
          </div>
        ) : (
          `Item #${idx}`
        )
      }
    />
  );
};
