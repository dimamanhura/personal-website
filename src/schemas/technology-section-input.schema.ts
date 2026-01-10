import { z } from 'zod';

export const technologySectionInputSchema = z.object({
  title: z.string().min(2).max(255),
  type: z.string().min(2).max(255),
  logo: z.url().min(2).max(255),
});

export type TechnologySectionInput = z.input<typeof technologySectionInputSchema>;

export type TechnologySectionOutput = z.output<typeof technologySectionInputSchema>;
