import { z } from 'zod';

export const techStackInputSchema = z.object({
  categoryId: z.string().optional(),
  category: z.string().optional(),
  title: z.string().min(2).max(255),
  type: z.string().min(2).max(255),
  logo: z.url().min(2).max(255),
});

export type TechStackInput = z.input<typeof techStackInputSchema>;

export type TechStackOutput = z.output<typeof techStackInputSchema>;
