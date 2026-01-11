'use server';

import { db } from '@/db';
import { feedbackSectionInputSchema, FeedbackSectionInput, FeedbackSectionOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function editFeedbackSection(
  id: string,
  feedbackSection: FeedbackSectionInput,
): Promise<ManageItemFormState> {
  try {
    const result: FeedbackSectionOutput = feedbackSectionInputSchema.parse({
      title: feedbackSection.title,
      type: feedbackSection.type,
    });

    await db.feedbackSection.update({
      where: {
        id,
      },
      data: {
        title: result.title,
        type: result.type,
      },
    });

    revalidate.feedbackSections(id);

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
