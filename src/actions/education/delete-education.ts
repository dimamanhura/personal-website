'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

export const deleteEducation = async (id: string) => {
  await db.education.delete({
    where: {
      id,
    },
  });

  revalidate.education(id);

  redirect(paths.educationAdmin());
};
