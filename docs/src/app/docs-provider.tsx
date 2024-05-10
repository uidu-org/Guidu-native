"use client";
import { RootProvider } from "fumadocs-ui/provider";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const SearchDialog = dynamic(() => import("@/components/search-dialog"));

export function DocsProvider({ children }: { children: ReactNode }) {
  return <RootProvider enableThemeProvider search={{ SearchDialog }}>{children}</RootProvider>;
}
