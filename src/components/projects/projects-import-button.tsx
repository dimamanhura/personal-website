'use client';

import { createProjectsBulk } from '@/actions';
import { ImportDataButton } from '@/components';
import { projectInputSchema } from '@/schemas';

export const ProjectImportButton = () => {
  return (
    <ImportDataButton
      title="Projects"
      schema={projectInputSchema}
      onImport={createProjectsBulk}
      renderLabel={(item, idx) => item.name || `Item #${idx}`}
    />
  );
};
