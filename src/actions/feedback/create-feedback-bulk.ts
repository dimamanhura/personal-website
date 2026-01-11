'use server';

import { z } from 'zod';
import { db } from '@/db';
import { feedbackInputSchema, FeedbackInput, FeedbackOutput } from '@/schemas';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

const bulkFeedbackSchema = z.array(feedbackInputSchema);

export async function createFeedbackBulk(values: FeedbackInput[]) {
  try {
    const validatedData: FeedbackOutput[] = bulkFeedbackSchema.parse(values);

    const sections = await db.feedbackSection.findMany({
      select: { id: true, type: true },
    });

    const sectionMap = new Map(sections.map((s) => [s.type, s.id]));

    await db.feedback.createMany({
      data: validatedData.map((item) => ({
        sectionId: item.section ? sectionMap.get(item.section) || null : null,
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
