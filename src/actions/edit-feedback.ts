'use server';

import { z } from 'zod';
import { db } from '@/db';
import { feedbackInputSchema } from '@/types/FeedbackInputSchema';
import { formatErrors } from '@/utils/format-errors';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';

interface EditFeedbackFormState {
  success?: boolean;
  message?: string;
};

export async function editFeedback(id: string, feedback: z.infer<typeof feedbackInputSchema>): Promise<EditFeedbackFormState> {
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
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }

  return { success: true };
};
