import { z } from 'zod';
import { isRealDate } from '@/utils';

export const companyInputSchema = z.object({
  name: z.string().min(2).max(255),
  location: z.object({
    city: z.string().min(2).max(255),
    country: z.string().min(2).max(255),
  }),
  startAt: z.string().refine(isRealDate, { message: 'Invalid date' }),
  endAt: z.string().refine(isRealDate, { message: 'Invalid date' }).optional(),
  logo: z.url().min(2).max(255),
  position: z.string().min(2).max(255),
  positions: z
    .array(
      z.object({
        title: z.string().min(2).max(255),
        startAt: z.string().refine(isRealDate, { message: 'Invalid date' }),
        endAt: z
          .string()
          .refine(isRealDate, { message: 'Invalid date' })

          .optional(),
      }),
    )
    .min(1)
    .max(100),
  reasonsOfLeaving: z.array(z.string().min(2).max(255)).min(0).max(100).optional(),
});

export type CompanyInput = z.input<typeof companyInputSchema>;

export type CompanyOutput = z.output<typeof companyInputSchema>;
