'use client';

import { createContext, useContext, useMemo } from 'react';
import type { Source } from './types';

const SourceLookupContext = createContext<Map<number, Source> | undefined>(undefined);

export function SourceLookupProvider({
  sources,
  children,
}: {
  sources: Source[];
  children: React.ReactNode;
}) {
  const byId = useMemo(() => {
    const map = new Map<number, Source>();
    for (const s of sources) {
      const id = typeof s.id === 'number' ? s.id : parseInt(String(s.id), 10);
      if (Number.isFinite(id)) map.set(id, { ...s, id });
    }
    return map;
  }, [sources]);

  return (
    <SourceLookupContext.Provider value={byId}>{children}</SourceLookupContext.Provider>
  );
}

export function useSourceLookup(id: number): Source | undefined {
  return useContext(SourceLookupContext)?.get(id);
}
