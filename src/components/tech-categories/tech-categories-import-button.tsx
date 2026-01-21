'use client';

import { createTechCategoriesBulk } from '@/actions';
import { ImportDataButton } from '@/components';
import { techCategoryInputSchema } from '@/schemas';

export const TechCategoriesImportButton = () => {
  return (
    <ImportDataButton
      title="Tech Categories"
      schema={techCategoryInputSchema}
      onImport={createTechCategoriesBulk}
      renderLabel={(item, idx) => item.title || `Item #${idx}`}
    />
  );
};
