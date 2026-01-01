'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

export const deleteCompany = async (id: string) => {
  await db.company.delete({
    where: {
      id,
    },
  });

  revalidate.companies(id);

  redirect(paths.companiesAdmin());
};
