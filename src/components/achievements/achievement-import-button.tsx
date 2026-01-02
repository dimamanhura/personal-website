'use client';

import { createAchievementsBulk } from '@/actions';
import { ImportDataButton } from '@/components';
import { achievementInputSchema } from '@/schemas';

export const AchievementImportButton = () => {
  return (
    <ImportDataButton
      title="Achievements"
      schema={achievementInputSchema}
      onImport={createAchievementsBulk}
      renderLabel={(item, idx) => item.title || `Item #${idx}`}
    />
  );
};
