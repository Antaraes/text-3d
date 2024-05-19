'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { PageContextProvider } from '../contexts/PageContext';
import { Toaster } from 'react-hot-toast';

const Provider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageContextProvider>{children}</PageContextProvider>
        <Toaster />
      </QueryClientProvider>
    </>
  );
};

export default Provider;
