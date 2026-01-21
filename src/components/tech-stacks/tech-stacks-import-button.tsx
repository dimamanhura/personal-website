'use client';

import { createTechStacksBulk } from '@/actions';
import { ImportDataButton } from '@/components';
import { techStackInputSchema } from '@/schemas';

export const TechStacksImportButton = () => {
  return (
    <ImportDataButton
      title="Tech Stacks"
      schema={techStackInputSchema}
      onImport={createTechStacksBulk}
      renderLabel={(item, idx) => item.title || `Item #${idx}`}
    />
  );
};
