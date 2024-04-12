'use client';

import { useParams } from 'next/navigation';
import type { ReactNode } from 'react';

export function Body({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const mode = useMode();

  return <div className={"bg-blue-100/60 w-full"}>{children}</div>;
}


export function useMode(): string | undefined {
  const { slug } = useParams();
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : undefined;
}

