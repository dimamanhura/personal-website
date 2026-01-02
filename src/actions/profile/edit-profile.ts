'use server';

import { db } from '@/db';
import { profileInputSchema, ProfileInput, ProfileOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function editProfile(id: string, profile: ProfileInput): Promise<ManageItemFormState> {
  try {
    const result: ProfileOutput = profileInputSchema.parse({
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
        title: result.title,
        description: result.description,
        avatar: result.avatar,
        contacts: result.contacts,
        location: result.location,
      },
    });

    revalidate.profile(id);

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
