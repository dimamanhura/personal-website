'use client';

import { Tooltip } from '@nextui-org/react';
import { truncateText } from '@/utils';

interface TruncatedTextProps {
  text: string | null;
  maxLength?: number;
}

export const TruncatedText = ({ text, maxLength }: TruncatedTextProps) => {
  if (!text) {
    return <span>N/A</span>;
  }

  return (
    <Tooltip content={text} className="max-w-unit-72">
      <span>{truncateText(text, maxLength)}</span>
    </Tooltip>
  );
};
