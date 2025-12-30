'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import paths from '@/paths';
import { educationInputSchema, EducationInput, EducationOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, normalizeToMidnight } from '@/utils';

export async function createEducation(values: EducationInput): Promise<ManageItemFormState> {
  try {
    const result: EducationOutput = educationInputSchema.parse({
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
        startAt: normalizeToMidnight(result.startAt),
        endAt: result.endAt ? normalizeToMidnight(result.endAt) : null,
      },
    });

    revalidatePath(paths.educationAdmin());

    return { success: true, id: education.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
