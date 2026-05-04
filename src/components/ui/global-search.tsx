'use client';

import { useCallback, useState } from 'react';
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Modal,
  useDisclosure,
} from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import { GlobalSearchInput, GlobalSearchResult, SearchAiOverview } from '@/components';
import { MIN_SEARCH_LENGTH } from '@/constants';
import { GlobalSearchResultItem } from '@/types';

export const GlobalSearch = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<GlobalSearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [overviewText, setOverviewText] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    setSearchTerm(query);
    setOverviewText(null);
    setIsGenerating(false);
    setError(null);

    if (!query) {
      setItems([]);
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          setError('Too many requests. Please slow down.');
        }
        setItems([]);
        return;
      }

      const { results } = await response.json();
      setItems(results);
    } catch {
      setItems([]);
      setError('Search failed. Try again later.');
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleGenerateOverview = useCallback(async () => {
    if (!searchTerm || items.length === 0) return;

    setIsGenerating(true);
    setOverviewText(null);
    setError(null);

    try {
      const response = await fetch('/api/overview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm, results: items }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          setError('AI generation limit reached. Wait a minute.');
        }
        return;
      }

      const { overview } = await response.json();
      setOverviewText(overview);
    } catch {
      setOverviewText('Failed to generate overview.');
    } finally {
      setIsGenerating(false);
    }
  }, [searchTerm, items]);

  const handleClose = () => {
    setSearchTerm('');
    setItems([]);
    setOverviewText(null);
    setError(null);
    onClose();
  };

  return (
    <>
      <Button
        startContent={<FaSearch color="grey" />}
        variant="bordered"
        color="default"
        onClick={onOpen}
      >
        Search
      </Button>
      <Modal
        hideCloseButton
        scrollBehavior="inside"
        backdrop="blur"
        placement="top-center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleClose}
      >
        <ModalContent className="max-h-[600px]">
          <ModalHeader className="align-center flex gap-1 border-b border-divider px-0 py-0">
            <GlobalSearchInput onSearch={handleSearch} />
          </ModalHeader>
          <ModalBody className="min-h-24">
            {error && (
              <div className="mx-2 rounded-lg bg-danger-50 p-4 text-center text-sm font-medium text-danger">
                {error}
              </div>
            )}

            {searchTerm.length >= MIN_SEARCH_LENGTH && items.length > 0 && !isSearching && (
              <SearchAiOverview
                isGenerating={isGenerating}
                overviewText={overviewText}
                onGenerate={handleGenerateOverview}
              />
            )}
            <GlobalSearchResult
              searchTerm={searchTerm}
              isSearching={isSearching}
              items={items}
              onClose={handleClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
