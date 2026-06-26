'use client';

import { useEffect, useState, useMemo, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './result.module.css';
import { search } from '@/lib/searchClient';
import UserMessage from '@/components/chat/UserMessage';
import LoadingMessage from '@/components/chat/LoadingMessage';
import AssistantMessage from '@/components/chat/AssistantMessage';
import type { SearchResponse, Place } from '@/components/chat/types';

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

function ResultInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuery = params.get('q') ?? '';
  const city = params.get('city') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [genTime, setGenTime] = useState(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!query) { setLoading(false); return; }

    setLoading(true);
    setError(null);
    startRef.current = Date.now();

    search({ query, city, match_count: 20 })
      .then((data) => {
        setResult(data);
        setGenTime((Date.now() - startRef.current) / 1000);
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [query, city]);

  const places: Place[] = Array.isArray(result?.places) ? result!.places! : [];

  const dayList = useMemo(() => {
    const days = places.map((p) => p.day).filter((d): d is number => d != null);
    return Array.from(new Set(days)).sort((a, b) => a - b);
  }, [places]);

  const [activeDay, setActiveDay] = useState<number | null>(null);

  useEffect(() => {
    setActiveDay(dayList.length > 0 ? dayList[0] : null);
  }, [dayList]);

  const handleRefClick = (id: number) => {
    // Open source accordion first, then scroll after render
    window.dispatchEvent(new Event('tripmoa:openSources'));
    setTimeout(() => {
      const el = document.getElementById(`source-${id}`);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.background = '#fff8e1';
      el.style.boxShadow = '0 0 0 2px #fbbf24';
      setTimeout(() => {
        el.style.background = '';
        el.style.boxShadow = '';
      }, 1500);
    }, 160);
  };

  const handleFollowUpClick = (text: string) => {
    trackFollowUpClick(text);
    setResult(null);
    setQuery(text);
    setInputValue('');
  };

  const handleNewSearch = () => {
    const q = inputValue.trim();
    if (!q) return;
    setResult(null);
    setQuery(q);
    setInputValue('');
  };

  return (
    <main className={styles.screen}>
      {/* Sticky header */}
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

      {/* Chat container */}
      <div className={styles.chatWrap}>
        {/* User message bubble */}
        {query && <UserMessage query={query} city={city} />}

        {/* Loading: avatar + animated typing */}
        {loading && <LoadingMessage />}

        {/* Error */}
        {error && (
          <div className={styles.errorMsg}>요청 실패: {error}</div>
        )}

        {/* Full assistant response */}
        {!loading && !error && result && (
          <AssistantMessage
            result={result}
            query={query}
            genTime={genTime}
            places={places}
            dayList={dayList}
            activeDay={activeDay}
            setActiveDay={setActiveDay}
            onRefClick={handleRefClick}
            onFollowUpClick={handleFollowUpClick}
            onSourceClick={trackSourceClick}
          />
        )}

        {/* No query state */}
        {!loading && !query && (
          <p className={styles.empty}>
            검색어가 없어요.{' '}
            <button className={styles.inlineLink} onClick={() => router.push('/prototype/home')}>
              홈으로 돌아가기
            </button>
          </p>
        )}
      </div>

      {/* 하단 고정 검색바 */}
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
