'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { redirect } from 'next/navigation';

export const deleteContactRequest = async (id: string) => {
  await db.contactRequest.delete({
    where: {
      id,
    },
  });
  revalidatePath(paths.contactRequestDetails(id));
  revalidatePath(paths.contactRequestsAdmin());
  redirect(paths.contactRequestsAdmin());
};
