'use server';

import { z } from 'zod';
import { db } from '@/db';
import { feedbackInputSchema, FeedbackInput, FeedbackOutput } from '@/schemas';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

const bulkFeedbackSchema = z.array(feedbackInputSchema);

export async function createFeedbackBulk(values: FeedbackInput[]) {
  try {
    const validatedData: FeedbackOutput[] = bulkFeedbackSchema.parse(values);

    await db.feedback.createMany({
      data: validatedData.map((item) => ({
        section: item.section,
        featured: item.featured,
        receivedAt: normalizeToMidnight(item.receivedAt),
        author: item.author,
        review: item.review,
      })),
    });

    revalidate.feedback();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
