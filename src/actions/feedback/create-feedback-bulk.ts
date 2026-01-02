'use server';

import { z } from 'zod';
import { db } from '@/db';
import { feedbackInputSchema, FeedbackInput, FeedbackOutput } from '@/schemas';
import { normalizeToMidnight, revalidate } from '@/utils';

const bulkFeedbackSchema = z.array(feedbackInputSchema);

export async function createFeedbackBulk(values: FeedbackInput[]) {
  const validatedData: FeedbackOutput[] = bulkFeedbackSchema.parse(values);

  await db.$transaction(async (tx) => {
    const createdItems = await Promise.all(
      validatedData.map((item) =>
        tx.feedback.create({
          data: {
            section: item.section,
            featured: item.featured,
            receivedAt: normalizeToMidnight(item.receivedAt),
            author: item.author,
            review: item.review,
          },
        }),
      ),
    );
    return createdItems;
  });

  revalidate.feedback();
}
