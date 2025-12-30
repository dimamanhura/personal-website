import { z } from 'zod';
import { isRealDate } from '@/utils';

export const educationInputSchema = z.object({
  location: z.object({
    city: z.string().min(2).max(255),
    country: z.string().min(2).max(255),
  }),
  name: z.string().min(2).max(255),
  title: z.string().min(2).max(255),
  degree: z.string().min(2).max(255),
  logo: z.url().min(2).max(255),
  startAt: z.string().refine(isRealDate, { message: 'Invalid date' }),
  endAt: z.string().refine(isRealDate, { message: 'Invalid date' }).optional(),
});

export type EducationInput = z.input<typeof educationInputSchema>;

export type EducationOutput = z.output<typeof educationInputSchema>;
