'use client';

import { useEffect, useState, useMemo, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './result.module.css';
import { search } from '@/lib/searchClient';
import UserMessage from '@/components/chat/UserMessage';
import LoadingMessage from '@/components/chat/LoadingMessage';
import AssistantMessage from '@/components/chat/AssistantMessage';
import type { SearchResponse, Place } from '@/components/chat/types';

type ChatMessage = {
  id: string;
  query: string;
  result: SearchResponse | null;
  genTime: number;
  error: string | null;
  status: 'loading' | 'done' | 'error';
  /** sessionStorage에서 복원된 메시지인지 (타이핑 효과 생략용) */
  restored?: boolean;
};

function trackSourceClick(url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'click_source_link', { source_url: url });
  }
}

function trackFollowUpClick(text: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'click_follow_up', { follow_up_text: text });
  }
}

function MessageTurn({
  msg,
  city,
  onRefClick,
  onFollowUpClick,
  onSourceClick,
}: {
  msg: ChatMessage;
  city: string;
  onRefClick: (messageId: string, sourceId: number) => void;
  onFollowUpClick: (q: string) => void;
  onSourceClick: (url: string) => void;
}) {
  const places: Place[] = Array.isArray(msg.result?.places) ? msg.result!.places! : [];

  const dayList = useMemo(() => {
    const days = places.map((p) => p.day).filter((d): d is number => d != null);
    return Array.from(new Set(days)).sort((a, b) => a - b);
  }, [places]);

  const [activeDay, setActiveDay] = useState<number | null>(null);

  useEffect(() => {
    setActiveDay(dayList.length > 0 ? dayList[0] : null);
  }, [dayList]);

  return (
    <div className={styles.chatTurn}>
      <UserMessage query={msg.query} city={city} />

      {msg.status === 'loading' && <LoadingMessage />}

      {msg.error && (
        <div className={styles.errorMsg}>요청 실패: {msg.error}</div>
      )}

      {msg.status === 'done' && msg.result && (
        <AssistantMessage
          result={msg.result}
          query={msg.query}
          city={city}
          genTime={msg.genTime}
          places={places}
          dayList={dayList}
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          messageId={msg.id}
          skipIntro={msg.restored}
          onRefClick={(id) => onRefClick(msg.id, id)}
          onFollowUpClick={onFollowUpClick}
          onSourceClick={onSourceClick}
        />
      )}
    </div>
  );
}

function chatStorageKey(city: string, seedQuery: string) {
  return `tripmoa-chat:v2:${city}:${seedQuery}`;
}

function ResultInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuery = params.get('q') ?? '';
  const city = params.get('city') ?? '';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const initialSearchDone = useRef(false);
  const loadingRef = useRef(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const storageKey = chatStorageKey(city, initialQuery);

  const runSearch = useCallback(
    async (q: string) => {
      const trimmed = q.trim();
      if (!trimmed || loadingRef.current) return;

      loadingRef.current = true;
      setLoading(true);

      const msgId = crypto.randomUUID();
      setMessages((prev) => [
        ...prev,
        { id: msgId, query: trimmed, result: null, genTime: 0, error: null, status: 'loading' },
      ]);

      const start = Date.now();

      try {
        const data = await search({ query: trimmed, city, match_count: 20 });
        // places 배열에 null이 섞여 들어올 수 있어 타입을 맞추기 위해 제거
        const cleanedResult: SearchResponse = {
          ...data,
          places: Array.isArray(data.places)
            ? data.places.filter((p): p is NonNullable<typeof p> => p !== null)
            : data.places,
        };
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? {
                  ...m,
                  result: cleanedResult,
                  genTime: (Date.now() - start) / 1000,
                  status: 'done' as const,
                }
              : m
          )
        );
      } catch (e) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? {
                  ...m,
                  error: e instanceof Error ? e.message : String(e),
                  status: 'error' as const,
                }
              : m
          )
        );
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [city]
  );

  // URL 첫 진입: sessionStorage 복원 또는 최초 검색 (HMR/새로고침 시 대화 유지)
  useEffect(() => {
    if (!initialQuery) return;

    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (parsed.length > 0) {
          // 복원된 메시지는 타이핑 효과 없이 바로 전체 표시
          setMessages(parsed.map((m) => ({ ...m, restored: true })));
          initialSearchDone.current = true;
          return;
        }
      }
    } catch {
      /* ignore corrupt storage */
    }

    if (initialSearchDone.current) return;
    initialSearchDone.current = true;
    runSearch(initialQuery);
  }, [initialQuery, storageKey, runSearch]);

  // 대화 히스토리 저장
  useEffect(() => {
    if (messages.length === 0 || !initialQuery) return;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {
      /* quota exceeded etc. */
    }
  }, [messages, storageKey, initialQuery]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleRefClick = (messageId: string, id: number) => {
    window.dispatchEvent(
      new CustomEvent('tripmoa:openSources', { detail: { messageId } })
    );

    const highlight = (el: HTMLElement) => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.background = '#fff8e1';
      el.style.boxShadow = '0 0 0 2px #fbbf24';
      setTimeout(() => {
        el.style.background = '';
        el.style.boxShadow = '';
      }, 1500);
    };

    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(`source-${messageId}-${id}`);
      if (el) {
        highlight(el);
        return;
      }
      if (attempt < 8) {
        setTimeout(() => tryScroll(attempt + 1), 80);
      }
    };

    setTimeout(() => tryScroll(), 50);
  };

  const handleFollowUpClick = (text: string) => {
    if (loading) return;
    trackFollowUpClick(text);
    setInputValue('');
    runSearch(text);
  };

  const handleNewSearch = () => {
    if (!inputValue.trim() || loading) return;
    runSearch(inputValue);
    setInputValue('');
  };

  return (
    <main className={styles.screen}>
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => router.push('/prototype/home')}
          aria-label="홈으로"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className={styles.headerWordmark}>
          <span className={styles.wTrip}>Trip</span>
          <span className={styles.wMoa}> MOA</span>
        </span>
      </div>

      <div className={styles.chatWrap}>
        {messages.map((msg) => (
          <MessageTurn
            key={msg.id}
            msg={msg}
            city={city}
            onRefClick={handleRefClick}
            onFollowUpClick={handleFollowUpClick}
            onSourceClick={trackSourceClick}
          />
        ))}

        {!loading && messages.length === 0 && !initialQuery && (
          <p className={styles.empty}>
            검색어가 없어요.{' '}
            <button className={styles.inlineLink} onClick={() => router.push('/prototype/home')}>
              홈으로 돌아가기
            </button>
          </p>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className={styles.searchBarWrap}>
        <div className={styles.searchBar}>
          <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <input
            className={styles.searchInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleNewSearch(); }}
            placeholder="Trip MOA에게 묻기"
            enterKeyHint="search"
          />
          <button
            className={styles.submitBtn}
            onClick={handleNewSearch}
            disabled={!inputValue.trim() || loading}
            aria-label="검색"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.5l1.9 5.4a3 3 0 001.8 1.8l5.4 1.9-5.4 1.9a3 3 0 00-1.8 1.8L12 20.7l-1.9-5.4a3 3 0 00-1.8-1.8L2.9 11.6l5.4-1.9a3 3 0 001.8-1.8L12 2.5z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.bottomPad} />
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className={styles.screen}>
          <div className={styles.suspenseFallback}>불러오는 중…</div>
        </main>
      }
    >
      <ResultInner />
    </Suspense>
  );
}