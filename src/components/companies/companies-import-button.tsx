'use client';

import { createCompaniesBulk } from '@/actions';
import { ImportDataButton } from '@/components';
import { companyInputSchema } from '@/schemas';

export const CompaniesImportButton = () => {
  return (
    <ImportDataButton
      title="Companies"
      schema={companyInputSchema}
      onImport={createCompaniesBulk}
      renderLabel={(item, idx) => item.name || `Item #${idx}`}
    />
  );
};
