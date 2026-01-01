'use server';

import { db } from '@/db';
import { feedbackInputSchema, FeedbackInput, FeedbackOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

export async function createFeedback(values: FeedbackInput): Promise<ManageItemFormState> {
  try {
    const result: FeedbackOutput = feedbackInputSchema.parse({
      section: values.section,
      featured: values.featured,
      receivedAt: values.receivedAt,
      author: values.author,
      review: values.review,
    });

    const feedback = await db.feedback.create({
      data: {
        section: result.section,
        featured: result.featured,
        receivedAt: normalizeToMidnight(result.receivedAt),
        author: result.author,
        review: result.review,
      },
    });

    revalidate.feedback();

    return { success: true, id: feedback.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
