import { SearchItem } from '@/types';

interface SearchResultSnippetProps {
  item: SearchItem;
  searchTerm: string;
}

export const SearchResultSnippet = ({ item, searchTerm }: SearchResultSnippetProps) => {
  const rawSnippet = item?.highlights?.[0];

  if (!rawSnippet) return null;

  const searchLower = searchTerm.toLowerCase();

  if (
    item.title.toLowerCase().includes(searchLower) ||
    item.subtitle.toLowerCase().includes(searchLower)
  ) {
    return null;
  }

  return (
    <div
      className="mt-1 line-clamp-1 text-xs italic text-gray-500 [&_em]:rounded-sm [&_em]:bg-yellow-200 [&_em]:px-1 [&_em]:font-bold [&_em]:not-italic [&_em]:text-gray-900"
      dangerouslySetInnerHTML={{ __html: rawSnippet }}
    />
  );
};
