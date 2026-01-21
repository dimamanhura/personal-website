'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

export const deleteTechCategory = async (id: string) => {
  await db.techCategory.delete({
    where: {
      id,
    },
  });

  revalidate.techCategories(id);

  redirect(paths.techCategoriesAdmin());
};
