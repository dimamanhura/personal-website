'use server';

import { z } from 'zod';
import { db } from '@/db';
import { feedbackInputSchema } from '@/types/FeedbackInputSchema';
import { formatErrors } from '@/utils/format-errors';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';

interface CreateFeedbackFormState {
  success?: boolean;
  message?: string;
  id?: string; 
};

export async function createFeedback(values: z.infer<typeof feedbackInputSchema>): Promise<CreateFeedbackFormState> {
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
