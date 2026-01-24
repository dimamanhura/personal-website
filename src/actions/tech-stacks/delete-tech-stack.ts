'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

export const deleteTechStack = async (id: string) => {
  await db.techStack.delete({
    where: {
      id,
    },
  });

  revalidate.techStacks(id);

  redirect(paths.techStacksAdmin());
};
