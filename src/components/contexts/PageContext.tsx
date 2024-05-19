import React, { createContext, ReactNode, useContext, useState } from 'react';

export const PageContext = createContext<any>(undefined);

interface PageContextProviderProps {
  children: ReactNode;
}

export const PageContextProvider: React.FC<PageContextProviderProps> = ({
  children,
}) => {
  const [isNextPage, setIsNextPage] = useState<boolean>(false);

  return (
    <PageContext.Provider value={{ isNextPage, setIsNextPage }}>
      {children}
    </PageContext.Provider>
  );
};

export function usePageContext() {
  return useContext(PageContext);
}
