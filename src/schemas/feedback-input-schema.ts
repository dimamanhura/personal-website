import { FeedbackSectionType } from '@prisma/client';
import { z } from 'zod';
import { isRealDate } from '@/utils';

export const feedbackInputSchema = z.object({
  featured: z.boolean(),
  review: z.string().min(2).max(1000),
  section: z.enum(FeedbackSectionType, { message: 'Invalid input: required' }),
  author: z.string().min(2).max(255),
  createdAt: z.string().refine(isRealDate, { message: 'Invalid date' }),
});
