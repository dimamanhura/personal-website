import { z } from 'zod';

export const techStackInputSchema = z.object({
  displayOrder: z.coerce.number().min(0),
  categoryId: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean(),
  title: z.string().min(2).max(255),
  type: z.string().min(2).max(255),
  logo: z.url().min(2).max(255).optional(),
});

export type TechStackInput = z.input<typeof techStackInputSchema>;

export type TechStackOutput = z.output<typeof techStackInputSchema>;
