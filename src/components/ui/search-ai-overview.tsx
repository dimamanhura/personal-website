'use client';

import { Button, Skeleton } from '@nextui-org/react';
import { FaMagic, FaRobot } from 'react-icons/fa';

export interface SearchAiOverviewProps {
  isGenerating: boolean;
  overviewText: string | null;
  onGenerate: () => void;
}

export const SearchAiOverview = ({
  isGenerating,
  overviewText,
  onGenerate,
}: SearchAiOverviewProps) => {
  return (
    <div className="flex flex-col gap-3 border-b border-divider bg-default-50/50 p-4">
      {!isGenerating && !overviewText && (
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

      {overviewText && !isGenerating && (
        <div className="flex flex-col gap-2 rounded-medium bg-secondary-50/50 p-3 dark:bg-secondary-50/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
            <FaRobot />
            AI Overview
          </div>
          <div
            className="text-[13px] leading-relaxed text-default-700 dark:text-default-400"
            dangerouslySetInnerHTML={{ __html: overviewText }}
          />
        </div>
      )}
    </div>
  );
};
