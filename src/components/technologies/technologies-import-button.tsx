'use client';

import { createTechnologiesBulk } from '@/actions';
import { ImportDataButton } from '@/components';
import { technologyInputSchema } from '@/schemas';

export const TechnologiesImportButton = () => {
  return (
    <ImportDataButton
      title="Technologies"
      schema={technologyInputSchema}
      onImport={createTechnologiesBulk}
      renderLabel={(item, idx) => item.title || `Item #${idx}`}
    />
  );
};
