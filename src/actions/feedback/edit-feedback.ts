'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import paths from '@/paths';
import { feedbackInputSchema, FeedbackInput, FeedbackOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, normalizeToMidnight } from '@/utils';

export async function editFeedback(
  id: string,
  feedback: FeedbackInput,
): Promise<ManageItemFormState> {
  try {
    const result: FeedbackOutput = feedbackInputSchema.parse({
      section: feedback.section,
      featured: feedback.featured,
      receivedAt: feedback.receivedAt,
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
        receivedAt: normalizeToMidnight(result.receivedAt),
        author: result.author,
        review: result.review,
      },
    });

    revalidatePath(paths.feedbackDetailsByIdAdmin(id));
    revalidatePath(paths.feedbackAdmin());
    revalidatePath(paths.feedback());
    revalidatePath(paths.home());

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
