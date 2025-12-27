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
      location: profile.location,
      avatar: profile.avatar,
      description: profile.description,
      contacts: profile.contacts,
    });

    await db.meta.update({
      where: {
        id,
      },
      data: {
        firstName: result.firstName,
        lastName: result.lastName,
        location: result.location,
        avatar: result.avatar,
        description: result.description,
        contacts: result.contacts,
      },
    });

    revalidatePath(paths.profileEditByIdAdmin(id));
    revalidatePath(paths.profileAdmin());

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
