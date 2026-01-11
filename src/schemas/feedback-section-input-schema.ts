import { z } from 'zod';

export const feedbackSectionInputSchema = z.object({
  type: z.string().min(2).max(255),
  title: z.string().min(2).max(255),
});

export type FeedbackSectionInput = z.input<typeof feedbackSectionInputSchema>;

export type FeedbackSectionOutput = z.output<typeof feedbackSectionInputSchema>;
