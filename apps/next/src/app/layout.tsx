import { I18nProvider } from "fumadocs-ui/i18n";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { DocsProvider } from "./docs-provider";

import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Guidu - %s",
    default: "Guidu website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <I18nProvider
          locale="en"
          translations={{
            en: {
              name: "English",
            },
            it: {
              name: "Italian",
            },
          }}
        >
          <DocsProvider>
            {children}
            {/* <Footer categories={footer} /> */}
          </DocsProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
