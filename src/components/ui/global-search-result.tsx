'use client';

import { SearchResultItemCard } from '@/components';
import { GLOBAL_SEARCH_SECTION_ORDER } from '@/constants';
import { SearchItem } from '@/types';

interface GlobalSearchResultProps {
  searchTerm: string;
  items: SearchItem[];
  onClose: () => void;
}

export const GlobalSearchResult = ({ searchTerm, items, onClose }: GlobalSearchResultProps) => {
  const groupedResults = items.reduce<Record<string, SearchItem[]>>((acc, item) => {
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
