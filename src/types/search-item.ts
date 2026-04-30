import { SearchItemType } from '@/types';

export interface SearchItem {
  id: string;
  type: SearchItemType;
  title: string;
  subtitle: string;
  url?: string;
  image?: string;
  searchableText: string;
  highlights?: string[];
}
