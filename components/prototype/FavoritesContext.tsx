'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';

export type FavoriteItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string | null;
  category: string; // 뱃지에 쓰이는 한글 카테고리 (예: 'SNS스팟', '맛집', '추천일정', '숙소' 등)
  date: string; // 'YYYY.MM.DD' 또는 ISO 문자열, 표시용
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  isFavorited: (id: string) => boolean;
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (item: FavoriteItem) => void;
};

const STORAGE_KEY = 'tripmoa_favorites';

const FavoritesContext = createContext<FavoritesContextType | null>(null);

function loadFromStorage(): FavoriteItem[] {
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

function saveToStorage(items: FavoriteItem[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // 저장 실패는 무시 (프로토타입 단계라 치명적이지 않음)
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // 최초 마운트 시 localStorage에서 복원
  useEffect(() => {
    setFavorites(loadFromStorage());
    setHydrated(true);
  }, []);

  // favorites가 바뀔 때마다 localStorage에 동기화 (최초 hydrate 이후부터만)
  useEffect(() => {
    if (!hydrated) return;
    saveToStorage(favorites);
  }, [favorites, hydrated]);

  const isFavorited = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const addFavorite = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === item.id)) return prev;
      return [item, ...prev];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      if (exists) return prev.filter((f) => f.id !== item.id);
      return [item, ...prev];
    });
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorited, addFavorite, removeFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites는 FavoritesProvider 내부에서만 사용할 수 있어요.');
  }
  return ctx;
}
