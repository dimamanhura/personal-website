'use client';

import { Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { FaTrophy, FaCommentDots, FaCode, FaBuilding, FaProjectDiagram } from 'react-icons/fa';
import { SearchResultSnippet } from '@/components';
import { SearchItem, SearchItemType } from '@/types';

interface SearchResultItemCardProps {
  item: SearchItem;
  searchTerm: string;
  onClose: () => void;
}

export const SearchResultItemCard = ({ item, searchTerm, onClose }: SearchResultItemCardProps) => {
  const getFallbackIcon = () => {
    switch (item.type) {
      case SearchItemType.achievement:
        return <FaTrophy className="text-default-500" />;
      case SearchItemType.feedback:
        return <FaCommentDots className="text-default-500" />;
      case SearchItemType.project:
        return <FaProjectDiagram className="text-default-500" />;
      case SearchItemType.company:
        return <FaBuilding className="text-default-500" />;
      case SearchItemType.technology:
        return <FaCode className="text-default-500" />;
      default:
        return null;
    }
  };

  const CardContent = (
    <div className="flex w-full cursor-pointer items-center gap-4 rounded-md border border-transparent p-2 transition-colors hover:bg-default-100">
      <Avatar
        src={item.image}
        icon={!item.image ? getFallbackIcon() : undefined}
        radius="sm"
        className="flex-shrink-0 bg-default-200"
      />

      <div className="flex flex-col overflow-hidden">
        <h4 className="truncate text-sm font-medium text-foreground">{item.title}</h4>
        <p className="truncate text-xs text-default-500">{item.subtitle}</p>

        <SearchResultSnippet item={item} searchTerm={searchTerm} />
      </div>
    </div>
  );

  if (item.url) {
    return (
      <Link href={item.url} className="block w-full" onClick={onClose}>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};
