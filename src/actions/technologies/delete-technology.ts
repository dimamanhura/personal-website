'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

export const deleteTechnology = async (id: string) => {
  await db.technology.delete({
    where: {
      id,
    },
  });

  revalidate.technologies(id);

  redirect(paths.technologiesAdmin());
};
