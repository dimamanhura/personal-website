'use client';

import { Button } from '@nextui-org/react';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { generateSlug } from '@/utils';

interface SlugGeneratorFieldProps {
  children: React.ReactNode;
  text: string;
  onChange: (value: string) => void;
}

export const SlugGeneratorField = ({ text, children, onChange }: SlugGeneratorFieldProps) => {
  const handleGenerate = () => {
    const slug = generateSlug(text);
    onChange(slug);
  };

  return (
    <div className="flex w-full items-center gap-4">
      {children}
      <Button
        color="primary"
        size="lg"
        type="button"
        variant="flat"
        onClick={handleGenerate}
        isIconOnly
      >
        <FaWandMagicSparkles />
      </Button>
    </div>
  );
};
