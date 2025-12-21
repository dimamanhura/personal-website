import { z } from 'zod';
import { isRealDate } from '@/utils';

export const companyInputSchema = z.object({
  name: z.string().min(2).max(255),
  location: z.object({
    city: z.string().min(2).max(255),
    country: z.string().min(2).max(255),
  }),
  startAt: z.string().refine(isRealDate, { message: 'Invalid date' }),
  endAt: z.string().refine(isRealDate, { message: 'Invalid date' }),
  logo: z.url().min(2).max(255),
  position: z.string().min(2).max(255),
  positions: z
    .array(
      z.object({
        title: z.string().min(2).max(255),
        startAt: z.string().refine(isRealDate, { message: 'Invalid date' }),
        endAt: z.string().refine(isRealDate, { message: 'Invalid date' }),
      }),
    )
    .min(1)
    .max(10),
  reasonsOfLeaving: z.array(z.string().min(2).max(255)).max(10),
});
