'use client';

import { Spinner } from '@nextui-org/react';
import { SearchResultItemCard } from '@/components';
import { GLOBAL_SEARCH_SECTION_ORDER, MIN_SEARCH_LENGTH } from '@/constants';
import { GlobalSearchResultItem } from '@/types';

interface GlobalSearchResultProps {
  isSearching: boolean;
  searchTerm: string;
  items: GlobalSearchResultItem[];
  onClose: () => void;
}

export const GlobalSearchResult = ({
  isSearching,
  searchTerm,
  items,
  onClose,
}: GlobalSearchResultProps) => {
  if (isSearching) {
    return (
      <div className="flex w-full items-center justify-center p-4">
        <Spinner size="lg" color="default" label="Searching..." />
      </div>
    );
  }

  if (!isSearching && searchTerm.length >= MIN_SEARCH_LENGTH && items.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center p-4 text-center text-default-500">
        <p>No results found for &quot;{searchTerm}&quot;</p>
      </div>
    );
  }

  const groupedResults = items.reduce<Record<string, GlobalSearchResultItem[]>>((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <div className="flex w-full flex-col gap-6 p-2">
      {GLOBAL_SEARCH_SECTION_ORDER.map((type) => {
        const groupItems = groupedResults[type];

        if (!groupItems || groupItems.length === 0) {
          return null;
        }

        return (
          <div key={type} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">{type}</h3>

            <div className="flex flex-col gap-2">
              {groupItems.map((item) => (
                <SearchResultItemCard
                  key={item.id}
                  item={item}
                  searchTerm={searchTerm}
                  onClose={onClose}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
