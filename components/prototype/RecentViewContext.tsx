'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';

export type RecentViewItem = {
  id: string;
  title: string;
  image: string | null;
  path: string; // 클릭 시 이동할 경로 또는 외부 링크
  viewedAt: string; // ISO 문자열, 표시/정렬용
};

type RecentViewContextType = {
  recentViews: RecentViewItem[];
  addRecentView: (item: Omit<RecentViewItem, 'viewedAt'>) => void;
  removeRecentView: (id: string) => void;
  clearRecentViews: () => void;
};

const STORAGE_KEY = 'tripmoa_recent_views';
const MAX_ITEMS = 20;

const RecentViewContext = createContext<RecentViewContextType | null>(null);

function loadFromStorage(): RecentViewItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: RecentViewItem[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // 저장 실패는 무시 (프로토타입 단계라 치명적이지 않음)
  }
}

export function RecentViewProvider({ children }: { children: ReactNode }) {
  const [recentViews, setRecentViews] = useState<RecentViewItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // 최초 마운트 시 localStorage에서 복원
  useEffect(() => {
    setRecentViews(loadFromStorage());
    setHydrated(true);
  }, []);

  // recentViews가 바뀔 때마다 localStorage에 동기화 (최초 hydrate 이후부터만)
  useEffect(() => {
    if (!hydrated) return;
    saveToStorage(recentViews);
  }, [recentViews, hydrated]);

  // 같은 id를 다시 보면 기존 기록을 지우고 맨 앞으로 이동 (최신순 유지) + 최대 20개 제한
  const addRecentView = useCallback((item: Omit<RecentViewItem, 'viewedAt'>) => {
    setRecentViews((prev) => {
      const filtered = prev.filter((v) => v.id !== item.id);
      const next: RecentViewItem = { ...item, viewedAt: new Date().toISOString() };
      return [next, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  const removeRecentView = useCallback((id: string) => {
    setRecentViews((prev) => prev.filter((v) => v.id !== id));
  }, []);

  const clearRecentViews = useCallback(() => {
    setRecentViews([]);
  }, []);

  return (
    <RecentViewContext.Provider value={{ recentViews, addRecentView, removeRecentView, clearRecentViews }}>
      {children}
    </RecentViewContext.Provider>
  );
}

export function useRecentViews() {
  const ctx = useContext(RecentViewContext);
  if (!ctx) {
    throw new Error('useRecentViews는 RecentViewProvider 내부에서만 사용할 수 있어요.');
  }
  return ctx;
}