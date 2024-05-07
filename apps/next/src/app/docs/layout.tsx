import { DocsLayout } from "fumadocs-ui/layout";
// import 'fumadocs-ui/style.css';
import type { ReactNode } from "react";
import { Body } from "../layout.client";
import { layoutProps } from "../layout.shared";

import "fumadocs-ui/style.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Body>
      <DocsLayout {...layoutProps}>{children}</DocsLayout>
    </Body>
  );
}
