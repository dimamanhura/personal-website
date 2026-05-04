import { SearchEntityType } from '@/types';

export const DEFAULT_LIMIT = 20;

export const MIN_SEARCH_LENGTH = 3;

export const GLOBAL_SEARCH_SECTION_ORDER = [
  SearchEntityType.technology,
  SearchEntityType.project,
  SearchEntityType.company,
  SearchEntityType.achievement,
  SearchEntityType.feedback,
];
