import { TechnologySectionType } from "@prisma/client";
import { z } from "zod";

export const technologyInputSchema = z.object({
  featured: z.boolean(),
  title: z.string().min(2).max(255),
  section: z.enum(TechnologySectionType, { message: 'Invalid input: required' }),
});
