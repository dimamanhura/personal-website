'use client';

import { NextUIProvider } from '@nextui-org/react';
import  { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme='system'>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default Providers;
