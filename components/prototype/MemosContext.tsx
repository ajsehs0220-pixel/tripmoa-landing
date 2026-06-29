'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';

export type MemoItem = {
  id: string;
  title: string; // 메모 제목 (예: '구매해야 할 것')
  items: string[]; // 항목 리스트 (불릿)
  createdAt: string; // ISO 문자열, 표시는 상대시간으로 가공
};

type MemosContextType = {
  memos: MemoItem[];
  addMemo: (title: string, items: string[]) => void;
  removeMemo: (id: string) => void;
  updateMemo: (id: string, title: string, items: string[]) => void;
};

const STORAGE_KEY = 'tripmoa_memos';

const MemosContext = createContext<MemosContextType | null>(null);

function loadFromStorage(): MemoItem[] {
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

function saveToStorage(items: MemoItem[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // 저장 실패는 무시 (프로토타입 단계라 치명적이지 않음)
  }
}

function generateId() {
  return `memo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function MemosProvider({ children }: { children: ReactNode }) {
  const [memos, setMemos] = useState<MemoItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // 최초 마운트 시 localStorage에서 복원
  useEffect(() => {
    setMemos(loadFromStorage());
    setHydrated(true);
  }, []);

  // memos가 바뀔 때마다 localStorage에 동기화 (최초 hydrate 이후부터만)
  useEffect(() => {
    if (!hydrated) return;
    saveToStorage(memos);
  }, [memos, hydrated]);

  const addMemo = useCallback((title: string, items: string[]) => {
    const cleanItems = items.map((s) => s.trim()).filter(Boolean);
    const newMemo: MemoItem = {
      id: generateId(),
      title: title.trim() || '제목 없는 메모',
      items: cleanItems,
      createdAt: new Date().toISOString(),
    };
    setMemos((prev) => [newMemo, ...prev]);
  }, []);

  const removeMemo = useCallback((id: string) => {
    setMemos((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const updateMemo = useCallback((id: string, title: string, items: string[]) => {
    const cleanItems = items.map((s) => s.trim()).filter(Boolean);
    setMemos((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, title: title.trim() || '제목 없는 메모', items: cleanItems } : m
      )
    );
  }, []);

  return (
    <MemosContext.Provider value={{ memos, addMemo, removeMemo, updateMemo }}>
      {children}
    </MemosContext.Provider>
  );
}

export function useMemos() {
  const ctx = useContext(MemosContext);
  if (!ctx) {
    throw new Error('useMemos는 MemosProvider 내부에서만 사용할 수 있어요.');
  }
  return ctx;
}

// ── 표시용 유틸 ──────────────────────────────────────────────

export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}주 전`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}개월 전`;
  const years = Math.floor(days / 365);
  return `${years}년 전`;
}
