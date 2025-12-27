'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import { profileInputSchema } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors } from '@/utils';

export async function editProfile(
  id: string,
  profile: z.infer<typeof profileInputSchema>,
): Promise<ManageItemFormState> {
  try {
    const result = profileInputSchema.parse({
      firstName: profile.firstName,
      lastName: profile.lastName,
      title: profile.title,
      description: profile.description,
      avatar: profile.avatar,
      contacts: profile.contacts,
      location: profile.location,
    });

    await db.meta.update({
      where: {
        id,
      },
      data: {
        firstName: result.firstName,
        lastName: result.lastName,
        title: profile.title,
        description: result.description,
        avatar: result.avatar,
        contacts: result.contacts,
        location: result.location,
      },
    });

    revalidatePath(paths.profileEditByIdAdmin(id));
    revalidatePath(paths.profileAdmin());

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
