import { SearchEntityType } from '@/types';

export interface GlobalSearchResultItem {
  id: string;
  type: SearchEntityType;
  title: string;
  subtitle: string;
  url?: string;
  image?: string;
  searchableText: string;
  highlights?: string[];
}
