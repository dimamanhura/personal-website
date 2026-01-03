import { z } from 'zod';

export const technologyInputSchema = z.object({
  sectionId: z.string().optional(),
  featured: z.boolean(),
  section: z.string().optional(),
  title: z.string().min(2).max(255),
});

export type TechnologyInput = z.input<typeof technologyInputSchema>;

export type TechnologyOutput = z.output<typeof technologyInputSchema>;
