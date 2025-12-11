'use client';

import { useEffect, useState } from 'react';
import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleChangeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <Switch
      startContent={<FaSun />}
      endContent={<FaMoon />}
      isSelected={theme === 'dark'}
      size="lg"
      onValueChange={handleChangeTheme}
    />
  );
};
