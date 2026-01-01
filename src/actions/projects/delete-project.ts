'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

export const deleteProject = async (id: string) => {
  await db.project.delete({
    where: {
      id,
    },
  });

  revalidate.projects(id);

  redirect(paths.projectsAdmin());
};
