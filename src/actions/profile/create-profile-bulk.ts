'use server';

import { z } from 'zod';
import { db } from '@/db';
import { profileInputSchema, ProfileInput, ProfileOutput } from '@/schemas';
import { revalidate } from '@/utils';

const bulkProfileSchema = z.array(profileInputSchema);

export async function createProfileBulk(values: ProfileInput[]) {
  const validatedData: ProfileOutput[] = bulkProfileSchema.parse(values);

  await db.$transaction(async (tx) => {
    const createdItems = await Promise.all(
      validatedData.map((item) =>
        tx.meta.create({
          data: {
            firstName: item.firstName,
            lastName: item.lastName,
            title: item.title,
            description: item.description,
            avatar: item.avatar,
            contacts: item.contacts,
            location: item.location,
          },
        }),
      ),
    );
    return createdItems;
  });

  revalidate.profile();
}
