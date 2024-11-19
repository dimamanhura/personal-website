'use client';

import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(false);

  const handleChangeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
  };

  useEffect(() => {
    setIsSelected(theme === 'dark');
  }, [theme]);

  return (
    <Switch
      startContent={<FaSun />}
      endContent={<FaMoon />}
      isSelected={isSelected}
      size="lg"
      onValueChange={handleChangeTheme}
    />
  );
};

export default ThemeSwitcher;
