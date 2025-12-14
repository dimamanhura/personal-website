'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import { educationInputSchema } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors } from '@/utils';

export async function editEducation(
  id: string,
  education: z.infer<typeof educationInputSchema>,
): Promise<ManageItemFormState> {
  try {
    const result = educationInputSchema.parse({
      location: education.location,
      name: education.name,
      title: education.title,
      degree: education.degree,
      logo: education.logo,
      startAt: education.startAt,
      endAt: education.endAt,
    });

    await db.education.update({
      where: {
        id,
      },
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

    revalidatePath(paths.educationEditByIdAdmin(id));
    revalidatePath(paths.educationAdmin());

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
