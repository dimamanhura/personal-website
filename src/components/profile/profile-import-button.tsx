'use client';

import { createProfileBulk } from '@/actions';
import { ImportDataButton } from '@/components';
import { profileInputSchema } from '@/schemas';

export const ProfileImportButton = () => {
  return (
    <ImportDataButton
      title="Profile"
      schema={profileInputSchema}
      onImport={createProfileBulk}
      renderLabel={(item, idx) =>
        item.firstName && item.lastName ? `${item.firstName}: ${item.lastName}` : `Item #${idx}`
      }
    />
  );
};
