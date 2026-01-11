'use client';

import { createFeedbackSectionsBulk } from '@/actions';
import { ImportDataButton } from '@/components';
import { feedbackSectionInputSchema } from '@/schemas';

export const FeedbackSectionsImportButton = () => {
  return (
    <ImportDataButton
      title="Feedback Sections"
      schema={feedbackSectionInputSchema}
      onImport={createFeedbackSectionsBulk}
      renderLabel={(item, idx) => item.title || `Item #${idx}`}
    />
  );
};
