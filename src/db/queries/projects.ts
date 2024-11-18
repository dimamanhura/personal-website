import { cache } from "react";
import type { Project } from "@prisma/client";
import { db } from "@/db";

export const fetchFeaturedSignificantProjects = cache((): Promise<Project[]> => {
  return db.project.findMany({
    where: {
      featured: true,
    },
  });
});

export const fetchSignificantProjects = cache((): Promise<Project[]> => {
  return db.project.findMany();
});
