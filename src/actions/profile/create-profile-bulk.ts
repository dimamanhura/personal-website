'use server';

import { z } from 'zod';
import { db } from '@/db';
import { profileInputSchema, ProfileInput, ProfileOutput } from '@/schemas';
import { formatErrors, revalidate } from '@/utils';

const bulkProfileSchema = z.array(profileInputSchema);

export async function createProfileBulk(values: ProfileInput[]) {
  try {
    const validatedData: ProfileOutput[] = bulkProfileSchema.parse(values);

    await db.meta.createMany({
      data: validatedData.map((item) => ({
        firstName: item.firstName,
        lastName: item.lastName,
        title: item.title,
        description: item.description,
        avatar: item.avatar,
        contacts: item.contacts,
        location: item.location,
      })),
    });

    revalidate.profile();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
