'use client';

import { Button, Skeleton } from '@nextui-org/react';
import { FaMagic } from 'react-icons/fa';

export interface SearchAiOverviewProps {
  isGenerating: boolean;
  overviewHtml: string | null;
  onGenerate: () => void;
}

export const SearchAiOverview = ({
  isGenerating,
  overviewHtml,
  onGenerate,
}: SearchAiOverviewProps) => {
  return (
    <div className="flex flex-col gap-3 border-b border-divider bg-default-50/50 p-4">
      {!isGenerating && !overviewHtml && (
        <Button
          size="sm"
          color="secondary"
          variant="flat"
          startContent={<FaMagic />}
          onClick={onGenerate}
          className="w-fit"
        >
          Generate AI Overview
        </Button>
      )}

      {isGenerating && (
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-medium text-secondary">
            <FaMagic className="animate-pulse" />
            Generating insights...
          </div>
          <Skeleton className="w-full rounded-lg">
            <div className="h-3 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      )}

      {overviewHtml && !isGenerating && (
        <div
          className="prose prose-sm dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: overviewHtml }}
        />
      )}
    </div>
  );
};
