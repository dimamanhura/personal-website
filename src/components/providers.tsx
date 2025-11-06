'use client';

import { NextUIProvider } from '@nextui-org/react';
import  { ThemeProvider } from "next-themes";
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme='system'>
          {children}
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
