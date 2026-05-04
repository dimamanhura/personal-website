import { OpenSearchResponse, OpenSearchDocument, GlobalSearchResultItem } from '@/types';

export const transformSearchResults = (
  responseBody: OpenSearchResponse<OpenSearchDocument>,
): GlobalSearchResultItem[] => {
  return responseBody.hits.hits.map((hit) => {
    const source = hit._source;
    const highlightValues = hit.highlight ? Object.values(hit.highlight).flat() : [];

    return {
      id: source.id,
      type: source.type,
      title: source.title,
      subtitle: source.subtitle,
      searchableText: source.searchable_text,
      highlights: highlightValues.length > 0 ? highlightValues : undefined,
      url: source?.url,
      image: source?.image,
    };
  });
};
