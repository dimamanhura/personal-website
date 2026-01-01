'use server';

import { db } from '@/db';
import { educationInputSchema, EducationInput, EducationOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

export async function editEducation(
  id: string,
  education: EducationInput,
): Promise<ManageItemFormState> {
  try {
    const result: EducationOutput = educationInputSchema.parse({
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
        startAt: normalizeToMidnight(result.startAt),
        endAt: result.endAt ? normalizeToMidnight(result.endAt) : null,
      },
    });

    revalidate.education(id);

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
