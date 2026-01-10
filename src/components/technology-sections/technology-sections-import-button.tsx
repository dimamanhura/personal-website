'use client';

import { createTechnologySectionsBulk } from '@/actions';
import { ImportDataButton } from '@/components';
import { technologySectionInputSchema } from '@/schemas';

export const TechnologySectionsImportButton = () => {
  return (
    <ImportDataButton
      title="Technology Sections"
      schema={technologySectionInputSchema}
      onImport={createTechnologySectionsBulk}
      renderLabel={(item, idx) => item.title || `Item #${idx}`}
    />
  );
};
