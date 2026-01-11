'use server';

import { db } from '@/db';
import { feedbackInputSchema, FeedbackInput, FeedbackOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

export async function editFeedback(
  id: string,
  feedback: FeedbackInput,
): Promise<ManageItemFormState> {
  try {
    const result: FeedbackOutput = feedbackInputSchema.parse({
      sectionId: feedback.sectionId,
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
        sectionId: result.sectionId,
        featured: result.featured,
        receivedAt: normalizeToMidnight(result.receivedAt),
        author: result.author,
        review: result.review,
      },
    });

    revalidate.feedback(id);

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
