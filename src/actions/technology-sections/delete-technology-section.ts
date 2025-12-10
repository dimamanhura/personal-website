'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';

export const deleteTechnologySection = async (id: string) => {
  await db.technologySection.delete({
    where: {
      id,
    },
  });
  revalidatePath(paths.technologySectionsDetailsByIdAdmin(id));
  revalidatePath(paths.technologySectionsAdmin());
  redirect(paths.technologySectionsAdmin());
};
