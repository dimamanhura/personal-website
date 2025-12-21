'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';

export const deleteCompany = async (id: string) => {
  await db.company.delete({
    where: {
      id,
    },
  });
  revalidatePath(paths.companiesDetailsByIdAdmin(id));
  revalidatePath(paths.companiesAdmin());
  redirect(paths.companiesAdmin());
};
