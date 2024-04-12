import { DocsLayout } from "fumadocs-ui/layout";
import 'fumadocs-ui/style.css';
import type { ReactNode } from "react";
import { Body } from "../layout.client";
import { docs } from "../source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Body>
      <DocsLayout  tree={docs.pageTree}>
        {children}
      </DocsLayout>
    </Body>
  );
}
