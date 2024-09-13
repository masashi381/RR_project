"use client";
import { PageStatus, PageContextProps } from "@/types/commonTypes";
import { ReactNode, createContext, useState } from "react";

export const PageContext = createContext<PageContextProps>({} as PageContextProps);

export function PageContextProvider({ children }: { children: ReactNode }) {
  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.Loading);

  const notFound = () => setPageStatus(PageStatus.NotFound);

  return (
    <PageContext.Provider
      value={{
        pageStatus,
        setPageStatus,
        notFound,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}
