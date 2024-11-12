import { cache } from "react";
import type { Education } from "@prisma/client";
import { db } from "@/db";

export const fetchUniversities = cache((): Promise<Education[]> => {
  return db.education.findMany();
});
