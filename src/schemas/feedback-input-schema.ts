import { FeedbackSectionType } from '@prisma/client';
import { z } from 'zod';
import { isRealDate } from '@/utils';

export const feedbackInputSchema = z.object({
  featured: z.boolean(),
  review: z.string().min(2).max(8000),
  section: z.enum(FeedbackSectionType, { message: 'Invalid input: required' }),
  author: z.string().min(2).max(255),
  receivedAt: z.string().refine(isRealDate, { message: 'Invalid date' }),
});

export type FeedbackInput = z.input<typeof feedbackInputSchema>;

export type FeedbackOutput = z.output<typeof feedbackInputSchema>;
