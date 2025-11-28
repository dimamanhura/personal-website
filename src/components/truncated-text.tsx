'use client'

import { truncateText } from "@/utils/truncate-text";
import { Tooltip } from "@nextui-org/react";

interface TruncatedTextProps {
  text: string | null;
  maxLength?: number;
};

const TruncatedText = ({ text, maxLength }: TruncatedTextProps) => {
  if (!text) {
    return (
      <span>N/A</span>
    );
  }

  return (
    <Tooltip content={text} className="max-w-unit-72">
      <span>
        {truncateText(text, maxLength)}
      </span>
    </Tooltip>
  );
};

export default TruncatedText;
