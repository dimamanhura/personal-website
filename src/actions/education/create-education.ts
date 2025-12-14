'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import { educationInputSchema } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors } from '@/utils';

export async function createEducation(
  values: z.infer<typeof educationInputSchema>,
): Promise<ManageItemFormState> {
  try {
    const result = educationInputSchema.parse({
      location: values.location,
      name: values.name,
      title: values.title,
      degree: values.degree,
      logo: values.logo,
      startAt: values.startAt,
      endAt: values.endAt,
    });

    const education = await db.education.create({
      data: {
        location: result.location,
        name: result.name,
        title: result.title,
        degree: result.degree,
        logo: result.logo,
        startAt: result.startAt,
        endAt: result.endAt,
      },
    });

    revalidatePath(paths.educationAdmin());

    return { success: true, id: education.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
