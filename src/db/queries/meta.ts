import { cache } from "react";
import type { Meta } from "@prisma/client";
import { db } from "@/db";

export const fetchMeta = cache((): Promise<Meta | null> => {
  return db.meta.findFirst();
});
