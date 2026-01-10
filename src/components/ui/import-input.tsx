'use client';

import { ChangeEvent, useRef } from 'react';
import { FaUpload } from 'react-icons/fa';

interface ImportInputProps {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ImportInput = ({ handleFileChange }: ImportInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        id="file-import"
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-import"
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-divider p-12 transition-colors hover:bg-default-50"
      >
        <FaUpload className="mb-4 text-4xl text-primary" />
        <span className="text-lg font-medium">Select JSON File</span>
        <span className="text-sm text-default-400">Items will be validated before import</span>
      </label>
    </>
  );
};
