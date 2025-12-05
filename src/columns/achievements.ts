import { Column } from "@/types";
import { ColumnKey } from "@/types";
import { Achievement } from "@prisma/client";

export const columns: Column<ColumnKey<Achievement>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'title', label: 'Title', allowsSorting: true },
  { key: 'description', label: 'Description', allowsSorting: true },
  { key: 'solution', label: 'Solution', allowsSorting: true },
  { key: 'result', label: 'Review', allowsSorting: true },
  { key: 'notes', label: 'Notes', allowsSorting: true },
  { key: 'featured', label: 'Featured', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
