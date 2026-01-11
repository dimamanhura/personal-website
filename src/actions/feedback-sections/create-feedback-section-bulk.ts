'use server';

import { z } from 'zod';
import { db } from '@/db';
import { feedbackSectionInputSchema, FeedbackSectionInput, FeedbackSectionOutput } from '@/schemas';
import { formatErrors, revalidate } from '@/utils';

const bulkFeedbackSectionSchema = z.array(feedbackSectionInputSchema);

export async function createFeedbackSectionsBulk(values: FeedbackSectionInput[]) {
  try {
    const validatedData: FeedbackSectionOutput[] = bulkFeedbackSectionSchema.parse(values);

    await db.feedbackSection.createMany({
      data: validatedData.map((item) => ({
        title: item.title,
        type: item.type,
      })),
    });

    revalidate.feedbackSections();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
