import { TechnologyWithSection } from "@/db/queries/technologies";
import { Column } from "@/types";
import { ColumnKey } from "@/types";

export const columns: Column<ColumnKey<TechnologyWithSection>>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'title', label: 'Title', allowsSorting: true },
  { key: 'technologySection', label: 'Section', allowsSorting: true },
  { key: 'featured', label: 'Featured', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];
