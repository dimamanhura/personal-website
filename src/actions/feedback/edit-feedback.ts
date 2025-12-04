'use server';

import { z } from 'zod';
import { db } from '@/db';
import { feedbackInputSchema } from '@/schemas';
import { formatErrors } from '@/utils/format-errors';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { ManageItemFormState } from '@/types';

export async function editFeedback(id: string, feedback: z.infer<typeof feedbackInputSchema>): Promise<ManageItemFormState> {
  try {
    const result = feedbackInputSchema.parse({
      section: feedback.section,
      featured: feedback.featured,
      createdAt: feedback.createdAt,
      author: feedback.author,
      review: feedback.review,
    });

    await db.feedback.update({
      where: {
        id,
      },
      data: {
        section: result.section,
        featured: result.featured,
        createdAt: result.createdAt,
        author: result.author,
        review: result.review,
      },
    });

    revalidatePath(paths.feedbackDetails(id));
    revalidatePath(paths.feedbackAdmin());

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
};
