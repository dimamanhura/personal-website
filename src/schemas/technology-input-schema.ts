import { z } from 'zod';

export const technologyInputSchema = z.object({
  stackId: z.string().optional(),
  featured: z.boolean(),
  stack: z.string().optional(),
  title: z.string().min(2).max(255),
});

export type TechnologyInput = z.input<typeof technologyInputSchema>;

export type TechnologyOutput = z.output<typeof technologyInputSchema>;
