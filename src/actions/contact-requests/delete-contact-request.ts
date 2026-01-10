'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

export const deleteContactRequest = async (id: string) => {
  await db.contactRequest.delete({
    where: {
      id,
    },
  });

  revalidate.contactRequests(id);

  redirect(paths.contactRequestsAdmin());
};
