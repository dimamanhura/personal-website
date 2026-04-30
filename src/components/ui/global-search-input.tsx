'use client';

import { useEffect, useState } from 'react';
import { Input, Kbd } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from 'use-debounce';
import { MIN_SEARCH_LENGTH } from '@/constants';

export interface GlobalSearchInputProps {
  onSearch: (query: string) => Promise<void>;
}

const DELAY = 500;

export const GlobalSearchInput = ({ onSearch }: GlobalSearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, DELAY);

  const wrapperClassNames = [
    'bg-transparent',
    'dark:bg-transparent',
    'shadow-none',
    'rounded-none',
    'border-none',
    'data-[hover=true]:bg-transparent',
    'group-data-[focus=true]:bg-transparent',
  ];

  useEffect(() => {
    if (debouncedSearchTerm.length >= MIN_SEARCH_LENGTH) {
      onSearch(debouncedSearchTerm);
    } else if (debouncedSearchTerm.length === 0) {
      onSearch('');
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <Input
      className="rounded-bl-none rounded-br-none"
      startContent={<FaSearch color="grey" />}
      endContent={<Kbd className="hidden md:block">ESC</Kbd>}
      placeholder="What are you searching for?"
      autoFocus
      classNames={{
        inputWrapper: wrapperClassNames,
      }}
      size="lg"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};
