import { cache } from "react";
import type { Prisma } from "@prisma/client";
import { db } from "@/db";

export type TechnologySectionWithTechnologies = Prisma.TechnologySectionGetPayload<{ include: { technologies: true } }>

export const fetchTechnologiesSections = cache((): Promise<TechnologySectionWithTechnologies[]> => {
  return db.technologySection.findMany({
    include: {
      technologies: {
        where: {
          featured: true,
        },
      }
    }
  });
});
