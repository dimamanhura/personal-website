'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';

export const deleteContactRequest = async (id: string) => {
  await db.contactRequest.delete({
    where: {
      id,
    },
  });
  revalidatePath(paths.contactRequestsDetailsByIdAdmin(id));
  revalidatePath(paths.contactRequestsAdmin());
  redirect(paths.contactRequestsAdmin());
};
