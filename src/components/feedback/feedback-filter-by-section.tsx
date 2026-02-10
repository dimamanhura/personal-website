'use client';

import { Chip } from '@nextui-org/react';
import { FeedbackSection } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { truncateText } from '@/utils';

interface FeedbackFilterBySectionProps {
  sections: FeedbackSection[];
}

export const FeedbackFilterBySection = ({ sections }: FeedbackFilterBySectionProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get('search') || 'all';

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('page');

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="no-scrollbar mb-2 flex w-full gap-2 overflow-x-auto pb-4">
      <Chip
        as="button"
        variant={selected === 'all' ? 'solid' : 'flat'}
        color="primary"
        onClick={() => handleSelect('all')}
        className="cursor-pointer transition-transform active:scale-95"
      >
        All
      </Chip>
      {sections.map((section) => (
        <Chip
          key={section.id}
          as="button"
          variant={selected === section.type ? 'solid' : 'flat'}
          color="primary"
          onClick={() => handleSelect(section.type)}
          title={section.title}
          className="cursor-pointer whitespace-nowrap transition-transform active:scale-95"
        >
          {truncateText(section.title, 30)}
        </Chip>
      ))}
    </div>
  );
};
