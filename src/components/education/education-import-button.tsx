'use client';

import { createEducationBulk } from '@/actions';
import { ImportDataButton } from '@/components';
import { educationInputSchema } from '@/schemas';

export const EducationImportButton = () => {
  return (
    <ImportDataButton
      title="Education"
      schema={educationInputSchema}
      onImport={createEducationBulk}
      renderLabel={(item, idx) => item.name || `Item #${idx}`}
    />
  );
};
