import { z } from 'zod';

export const techToolInputSchema = z.object({
  stackId: z.string().optional(),
  featured: z.boolean(),
  stack: z.string().optional(),
  title: z.string().min(2).max(255),
});

export type TechToolInput = z.input<typeof techToolInputSchema>;

export type TechToolOutput = z.output<typeof techToolInputSchema>;
