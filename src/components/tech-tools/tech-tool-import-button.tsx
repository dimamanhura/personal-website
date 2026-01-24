'use client';

import { createTechToolsBulk } from '@/actions';
import { ImportDataButton } from '@/components';
import { techToolInputSchema } from '@/schemas';

export const TechToolsImportButton = () => {
  return (
    <ImportDataButton
      title="Tech Tools"
      schema={techToolInputSchema}
      onImport={createTechToolsBulk}
      renderLabel={(item, idx) => item.title || `Item #${idx}`}
    />
  );
};
