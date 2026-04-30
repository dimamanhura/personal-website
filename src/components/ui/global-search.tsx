'use client';

import { useState } from 'react';
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
import { SearchItem, SearchItemType } from '@/types';

const MOCK_SEARCH_RESULT_ITEMS = [
  {
    id: 'proj_01',
    type: SearchItemType.project,
    title: 'Travel App AI Chatbot',
    subtitle: 'Conversational AI integration for booking assistance',
    url: '/projects/chatbot_inside_travel_app',
    image:
      'https://res.cloudinary.com/dvicfzbxc/image/upload/v1731786784/projects/zihp9izcveqflww05wcc.png',
    searchableText:
      'Travel App AI Chatbot Conversational AI integration for booking assistance React Next.js Node.js AWS Bedrock Claude',
    highlights: ['...booking assistance <em>React</em> Next.js Node.js AWS...'],
  },
  {
    id: 'proj_02',
    type: SearchItemType.project,
    title: 'Global Portfolio Search',
    subtitle: 'Serverless RAG search engine with AWS OpenSearch and Bedrock',
    url: '/projects/global_portfolio_search',
    image:
      'https://res.cloudinary.com/dvicfzbxc/image/upload/v1731786784/projects/placeholder_search_app.png',
    searchableText:
      'Global Portfolio Search Serverless RAG search engine with AWS OpenSearch and Bedrock Next.js Lambda EventBridge ETL Pipeline',
    highlights: ['...engine with AWS <em>OpenSearch</em> and Bedrock Next.js...'],
  },
  {
    id: 'achiev_01',
    type: SearchItemType.achievement,
    title: 'Migration legacy AngularJS app to ReactJS app',
    subtitle: 'Performance optimization and architecture overhaul',
    url: '/achievements?id=695812bc36e03a608565ec2f',
    searchableText:
      'Migration legacy AngularJS app to ReactJS app Performance optimization and architecture overhaul Improved grid render time by 4-5x handling 80-100 rows smoothly',
    highlights: [
      'Migration legacy AngularJS app to <em>ReactJS</em> app Performance optimization...',
    ],
  },
  {
    id: 'feed_01',
    type: SearchItemType.feedback,
    title: 'Client Review: E-Commerce Platform',
    subtitle: 'Outstanding frontend delivery and communication',
    url: '/feedback?id=698b0829ad3afdeeaca7014f',
    searchableText:
      'Client Review: E-Commerce Platform Outstanding frontend delivery and communication Delivered the project 2 weeks ahead of schedule with zero major bugs in production.',
  },
  {
    id: 'feed_02',
    type: SearchItemType.feedback,
    title: 'Peer Review: UI/UX Team Lead',
    subtitle: 'Exceptional cross-functional collaboration',
    url: '/feedback?id=819c1938fe3b4eefa1a7024e',
    searchableText:
      'Peer Review: UI/UX Team Lead Exceptional cross-functional collaboration Dima consistently bridges the gap between design and engineering, ensuring pixel-perfect implementations while maintaining performance.',
  },
  {
    id: 'comp_01',
    type: SearchItemType.company,
    title: 'NIX Solutions',
    subtitle: 'Lead Full-Stack Developer',
    image: 'https://res.cloudinary.com/dvicfzbxc/image/upload/v1731346198/nix_logo.jpg',
    searchableText:
      'NIX Solutions Lead Full-Stack Developer Mentored junior developers, managed staging deployments, and led core frontend architecture decisions.',
  },
  {
    id: 'tech_01',
    type: SearchItemType.technology,
    title: 'React Ecosystem',
    subtitle: 'Frontend Framework & Libraries',
    image:
      'https://res.cloudinary.com/dvicfzbxc/image/upload/v1731747388/technologies/rtzhxolq1iqenl8izuxz.png',
    searchableText:
      'React Ecosystem Frontend Framework & Libraries Redux Zustand Next.js Webpack SPA Hooks',
    highlights: ['...Frontend Framework & Libraries <em>Redux</em> Zustand Next.js...'],
  },
];

export const GlobalSearch = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<SearchItem[]>([]);

  const [overviewHtml, setOverviewHtml] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchTerm(query);

    if (!query) {
      setItems([]);
      return;
    }

    try {
      /* TODO: Replace this block with your actual Next.js API route call later:
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setItems(data);
      */

      await new Promise((resolve) => setTimeout(resolve, 600));
      setItems(MOCK_SEARCH_RESULT_ITEMS);
    } catch {
      setItems([]);
    }
  };

  const handleGenerateOverview = async () => {
    if (!searchTerm) return;

    setIsGenerating(true);

    try {
      /* TODO: Replace with your actual Next.js API route call:
        const response = await fetch(`/api/overview?q=${encodeURIComponent(currentQuery)}`);
        const data = await response.text(); // Assuming it returns HTML
        setOverviewHtml(data);
      */

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockHtml = `
        <p class="text-sm text-default-600">
          Based on your search for <strong>"${searchTerm}"</strong>, Dima has extensive experience. 
          He has built <a href="/projects/chatbot_inside_travel_app" class="text-primary underline">Conversational AI integrations</a> 
          and led full-stack deployments at NIX Solutions.
        </p>
      `;
      setOverviewHtml(mockHtml);
    } catch {
      setOverviewHtml('<p class="text-danger text-sm">Failed to generate overview.</p>');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    setSearchTerm('');
    setItems([]);
    setOverviewHtml(null);
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
            {searchTerm.length >= MIN_SEARCH_LENGTH && items.length > 0 && (
              <SearchAiOverview
                isGenerating={isGenerating}
                overviewHtml={overviewHtml}
                onGenerate={handleGenerateOverview}
              />
            )}
            <GlobalSearchResult searchTerm={searchTerm} items={items} onClose={handleClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
