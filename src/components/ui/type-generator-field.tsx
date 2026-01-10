'use client';

import { Button } from '@nextui-org/react';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { generateType } from '@/utils';

interface TypeGeneratorFieldProps {
  children: React.ReactNode;
  text: string;
  onChange: (value: string) => void;
}

export const TypeGeneratorField = ({ text, children, onChange }: TypeGeneratorFieldProps) => {
  const handleGenerate = () => {
    const type = generateType(text);
    onChange(type);
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
