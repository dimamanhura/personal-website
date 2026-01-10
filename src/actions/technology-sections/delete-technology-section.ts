'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

export const deleteTechnologySection = async (id: string) => {
  await db.technologySection.delete({
    where: {
      id,
    },
  });

  revalidate.technologySections(id);

  redirect(paths.technologySectionsAdmin());
};
