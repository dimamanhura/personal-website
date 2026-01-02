'use client';

import { FaExclamationCircle } from 'react-icons/fa';

interface ItemErrorProps {
  error: string;
}

export const ItemError = ({ error }: ItemErrorProps) => {
  return (
    <div className="mt-1 flex items-center gap-2">
      <FaExclamationCircle className="flex-shrink-0 text-danger" size={12} />
      <span className="text-tiny leading-relaxed text-danger">{error}</span>
    </div>
  );
};
