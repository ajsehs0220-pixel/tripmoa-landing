'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ChatLike = {
  id: string;            // messageId
  query: string;         // 사용자가 던진 질문
  summary: string;       // AI 요약 (목록 미리보기용, 너무 길면 잘라서 저장)
  city?: string;
  date: string;           // ISO string
};

type ChatLikesContextType = {
  chatLikes: ChatLike[];
  isLiked: (id: string) => boolean;
  addChatLike: (item: Omit<ChatLike, 'date'>) => void;
  removeChatLike: (id: string) => void;
  toggleChatLike: (item: Omit<ChatLike, 'date'>) => void;
};

const ChatLikesContext = createContext<ChatLikesContextType | undefined>(undefined);

const STORAGE_KEY = 'tripmoa-chat-likes:v1';

export function ChatLikesProvider({ children }: { children: ReactNode }) {
  const [chatLikes, setChatLikes] = useState<ChatLike[]>([]);

  // 초기 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChatLikes(JSON.parse(saved));
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  // 변경 시 저장
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatLikes));
    } catch {
      /* quota exceeded etc. */
    }
  }, [chatLikes]);

  const isLiked = (id: string) => chatLikes.some((c) => c.id === id);

  const addChatLike = (item: Omit<ChatLike, 'date'>) => {
    setChatLikes((prev) => {
      if (prev.some((c) => c.id === item.id)) return prev;
      return [{ ...item, date: new Date().toISOString() }, ...prev];
    });
  };

  const removeChatLike = (id: string) => {
    setChatLikes((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleChatLike = (item: Omit<ChatLike, 'date'>) => {
    setChatLikes((prev) => {
      const exists = prev.some((c) => c.id === item.id);
      if (exists) return prev.filter((c) => c.id !== item.id);
      return [{ ...item, date: new Date().toISOString() }, ...prev];
    });
  };

  return (
    <ChatLikesContext.Provider
      value={{ chatLikes, isLiked, addChatLike, removeChatLike, toggleChatLike }}
    >
      {children}
    </ChatLikesContext.Provider>
  );
}

export function useChatLikes() {
  const ctx = useContext(ChatLikesContext);
  if (!ctx) throw new Error('useChatLikes must be used within ChatLikesProvider');
  return ctx;
}
