import { z } from 'zod';

export const techCategoryInputSchema = z.object({
  title: z.string().min(2).max(255),
  type: z.string().min(2).max(255),
});

export type TechCategoryInput = z.input<typeof techCategoryInputSchema>;

export type TechCategoryOutput = z.output<typeof techCategoryInputSchema>;
