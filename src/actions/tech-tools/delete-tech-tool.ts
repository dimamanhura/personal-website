'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

export const deleteTechTool = async (id: string) => {
  await db.techTool.delete({
    where: {
      id,
    },
  });

  revalidate.techTools(id);

  redirect(paths.techToolsAdmin());
};
