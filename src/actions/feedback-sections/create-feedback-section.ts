'use server';

import { db } from '@/db';
import { feedbackSectionInputSchema, FeedbackSectionInput, FeedbackSectionOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function createFeedbackSection(
  values: FeedbackSectionInput,
): Promise<ManageItemFormState> {
  try {
    const result: FeedbackSectionOutput = feedbackSectionInputSchema.parse({
      title: values.title,
      type: values.type,
    });

    const feedbackSection = await db.feedbackSection.create({
      data: {
        title: result.title,
        type: result.type,
      },
    });

    revalidate.feedbackSections();

    return { success: true, id: feedbackSection.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
