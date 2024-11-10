import { cache } from "react";
import type { Company } from "@prisma/client";
import { db } from "@/db";

export const fetchCompanies = cache((): Promise<Company[]> => {
  return db.company.findMany();
});
