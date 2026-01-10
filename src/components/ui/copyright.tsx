'use client';

import { useEffect, useState } from 'react';

interface CopyrightProps {
  name: string;
}

export const Copyright = ({ name }: CopyrightProps) => {
  const [year, setYear] = useState<number | string>('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="w-full bg-zinc-200 dark:bg-zinc-700">
      <div className="container mx-auto py-6 text-center">
        © {year} Copyright: {name}
      </div>
    </div>
  );
};
