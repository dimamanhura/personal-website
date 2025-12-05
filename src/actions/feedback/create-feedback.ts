'use server';

import { z } from 'zod';
import { db } from '@/db';
import { feedbackInputSchema } from '@/schemas';
import { formatErrors } from '@/utils';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { ManageItemFormState } from '@/types';

export async function createFeedback(values: z.infer<typeof feedbackInputSchema>): Promise<ManageItemFormState> {
  try {
    const result = feedbackInputSchema.parse({
      section: values.section,
      featured: values.featured,
      createdAt: values.createdAt,
      author: values.author,
      review: values.review,
    });

    const feedback = await db.feedback.create({
      data: {
        section: result.section,
        featured: result.featured,
        createdAt: result.createdAt,
        author: result.author,
        review: result.review,
      },
    });
  
    revalidatePath(paths.feedbackAdmin());

    return { success: true, id: feedback.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
};
