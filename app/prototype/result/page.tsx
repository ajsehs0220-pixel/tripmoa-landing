'use client';

import { useEffect, useState, useMemo, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './result.module.css';
import { searchStreaming } from '@/lib/searchClient';
import { mergeStreamSections, normalizeSearchResponse } from '@/lib/normalizeSearchResponse';
import UserMessage from '@/components/chat/UserMessage';
import LoadingMessage from '@/components/chat/LoadingMessage';
import AssistantMessage from '@/components/chat/AssistantMessage';
import type { SearchResponse, Place } from '@/components/chat/types';
import { inferCityFromQuery } from '@/components/chat/mapLabelUtils';
import BottomNav from '@/components/prototype/BottomNav';
import { trackEvent } from '@/lib/gtag';

type ChatMessage = {
  id: string;
  query: string;
  result: SearchResponse | null;
  error: string | null;
  status: 'loading' | 'streaming' | 'done' | 'error' | 'cancelled';
  restored?: boolean;
  /** 로딩 1~3번 완료 후 답변 노출 */
  introReady?: boolean;
  /** SSE로 섹션을 이미 노출했으면 done 후에도 skipIntro 유지 */
  streamed?: boolean;
};

function trackSourceClick(url: string) {
  trackEvent('click_source_link', { source_url: url });
}

function trackFollowUpClick(text: string) {
  trackEvent('click_follow_up', { follow_up_text: text });
}

function MessageTurn({
  msg,
  city,
  isLast,
  searchId,
  onRefClick,
  onFollowUpClick,
  onSourceClick,
  onIntroComplete,
}: {
  msg: ChatMessage;
  city: string;
  isLast: boolean;
  searchId?: string | null;
  onRefClick: (messageId: string, sourceId: number) => void;
  onFollowUpClick: (q: string) => void;
  onSourceClick: (url: string) => void;
  onIntroComplete?: (messageId: string) => void;
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

  const introReady = msg.introReady ?? msg.restored ?? false;
  const showAnswer =
    introReady && msg.result && (msg.status === 'streaming' || msg.status === 'done');

  return (
    <div className={styles.chatTurn}>
      <UserMessage query={msg.query} city={city} />

      {!introReady && msg.status === 'loading' && (
        <LoadingMessage
          mode="intro"
          onIntroComplete={() => onIntroComplete?.(msg.id)}
        />
      )}

      {msg.error && (
        <div className={styles.errorMsg}>요청 실패: {msg.error}</div>
      )}

      {showAnswer && (
        <AssistantMessage
          result={msg.result!}
          query={msg.query}
          city={city}
          isLast={isLast}
          places={places}
          dayList={dayList}
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          messageId={msg.id}
          searchId={searchId}
          skipIntro={msg.restored || msg.streamed === true}
          isStreaming={msg.status === 'streaming'}
          onRefClick={(id) => onRefClick(msg.id, id)}
          onFollowUpClick={onFollowUpClick}
          onSourceClick={onSourceClick}
        />
      )}

      {introReady && msg.status === 'streaming' && (
        <LoadingMessage mode="tail" />
      )}
    </div>
  );
}

function chatStorageKey(city: string, seedQuery: string) {
  return `tripmoa-chat:v3:${city}:${seedQuery}`;
}

/** 마이페이지용 마지막 세션 저장 */
function saveLastSession(
  query: string,
  city: string,
  result: SearchResponse,
  storageKey: string
) {
  try {
    const places = Array.isArray(result.places) ? result.places : [];
    const thumbnail =
      places.length > 0 && (places[0].photo_urls ?? []).length > 0
        ? (places[0].photo_urls ?? [])[0]
        : null;
    const followUps = result.follow_up ?? [];
    const sections = result.sections ?? [];
    const lastChat =
      followUps.length > 0
        ? followUps[0]
        : sections.length > 0
        ? sections[0].title ?? query
        : query;

    sessionStorage.setItem(
      'tripmoa-last-session',
      JSON.stringify({
        query,
        city: city || null,
        thumbnail,
        lastChat,
        savedAt: new Date().toISOString(),
        storageKey,
      })
    );
  } catch {
    /* ignore */
  }
}

function ResultInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuery = params.get('q') ?? '';
  const urlCity = params.get('city')?.trim() ?? '';

  const resolveCityForQuery = useCallback(
    (q: string) => urlCity || inferCityFromQuery(q) || '',
    [urlCity]
  );

  const storageCity = resolveCityForQuery(initialQuery);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const initialSearchDone = useRef(false);
  const loadingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const storageKey = chatStorageKey(storageCity, initialQuery);

  const isNearBottom = useCallback(() => {
    const threshold = 80;
    return (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - threshold
    );
  }, []);

  const scrollToBottomIfNeeded = useCallback(() => {
    if (isNearBottom()) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isNearBottom]);

  const upsertStreamingSection = useCallback(
    (
      sections: SearchResponse['sections'],
      index: number,
      patch: Partial<NonNullable<SearchResponse['sections']>[number]>
    ) => {
      const next = [...(sections ?? [])];
      while (next.length <= index) {
        next.push({ title: '', content: '', places_detail: [] });
      }
      const prev = next[index];
      const merged = { ...prev, ...patch };

      if (patch.places_detail?.length) {
        merged.places_detail = patch.places_detail.map((pd) => {
          const old = (prev.places_detail ?? []).find(
            (p) => p.name === pd.name || p.name.includes(pd.name) || pd.name.includes(p.name)
          );
          const reviews =
            (pd.reviews?.length ?? 0) > 0 ? pd.reviews : (old?.reviews ?? pd.reviews ?? []);
          return { ...old, ...pd, reviews: reviews ?? [] };
        });
      }

      next[index] = merged;
      return next;
    },
    []
  );

  const runSearch = useCallback(
    async (q: string) => {
      const trimmed = q.trim();
      if (!trimmed || loadingRef.current) return;

      loadingRef.current = true;
      trackEvent('start_search', { query: trimmed, city: resolveCityForQuery(trimmed) || undefined });
      setLoading(true);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const msgId = crypto.randomUUID();
      setMessages((prev) => [
        ...prev,
        { id: msgId, query: trimmed, result: null, error: null, status: 'loading', introReady: false },
      ]);

      try {
        const effectiveCity = resolveCityForQuery(trimmed);
        const emptyResult: SearchResponse = {
          summary: '',
          sections: [],
          warning: [],
          places: null,
          follow_up: [],
          sources: [],
          youtube_videos: [],
          map_title: '',
          search_id: null,
        };

        const data = await searchStreaming(
          {
            query: trimmed,
            city: effectiveCity || undefined,
            match_count: 20,
            signal: controller.signal,
          },
          {
            onDelta: (delta: any) => {
              setMessages((prev) =>
                prev.map((m) => {
                  if (m.id !== msgId) return m;
                  const base = m.result ?? emptyResult;
                  const introReady = m.introReady ?? false;
                  return {
                    ...m,
                    status: introReady
                      ? m.status === 'loading'
                        ? ('streaming' as const)
                        : m.status
                      : ('loading' as const),
                    streamed: introReady ? true : m.streamed,
                    result: {
                      ...base,
                      sections: upsertStreamingSection(base.sections, delta.index, {
                        content: delta.text,
                      }),
                    },
                  };
                })
              );
              requestAnimationFrame(() => scrollToBottomIfNeeded());
            },
            onSection: (section: any) => {
              const idx = section.index ?? 0;
              const { index: _idx, ...sec } = section;
              setMessages((prev) =>
                prev.map((m) => {
                  if (m.id !== msgId) return m;
                  const base = m.result ?? emptyResult;
                  const introReady = m.introReady ?? false;
                  return {
                    ...m,
                    status: introReady
                      ? m.status === 'loading'
                        ? ('streaming' as const)
                        : m.status
                      : ('loading' as const),
                    streamed: introReady ? true : m.streamed,
                    result: {
                      ...base,
                      sections: upsertStreamingSection(base.sections, idx, sec),
                    },
                  };
                })
              );
              requestAnimationFrame(() => scrollToBottomIfNeeded());
            },
            onDone: (footer: any) => {
              setMessages((prev) =>
                prev.map((m) => {
                  if (m.id !== msgId) return m;
                  const base = m.result ?? emptyResult;
                  const merged = normalizeSearchResponse({
                    ...base,
                    summary: footer.summary ?? base.summary,
                    warning: footer.warning ?? base.warning,
                    follow_up: footer.follow_up ?? base.follow_up,
                    sources: footer.sources ?? base.sources,
                    youtube_videos: footer.youtube_videos ?? base.youtube_videos,
                    map_title: footer.map_title ?? base.map_title,
                    search_id: footer.search_id ?? base.search_id,
                    sections: mergeStreamSections(base.sections, footer.sections),
                    places: base.places,
                  });
                  return {
                    ...m,
                    status: 'done' as const,
                    result: merged,
                  };
                })
              );
            },
            onPhotos: (photoPlaces: any) => {
              setMessages((prev) =>
                prev.map((m) => {
                  if (m.id !== msgId || !m.result) return m;
                  return {
                    ...m,
                    result: {
                      ...m.result,
                      places: photoPlaces,
                    },
                  };
                })
              );
            },
          }
        );

        const cleanedResult: SearchResponse = {
          ...data,
          places: Array.isArray(data.places)
            ? data.places.filter((p: Place | null): p is Place => p != null)
            : data.places,
        };
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? { ...m, result: cleanedResult, status: 'done' as const }
              : m
          )
        );
        trackEvent('view_answer', { query: trimmed, city: effectiveCity || undefined });
        if (!Array.isArray(cleanedResult.sections) || cleanedResult.sections.length === 0) {
          trackEvent('search_no_result', { query: trimmed, city: effectiveCity || undefined });
        }
        saveLastSession(trimmed, effectiveCity, cleanedResult, chatStorageKey(effectiveCity, trimmed));
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msgId ? { ...m, status: 'cancelled' as const, error: null } : m
            )
          );
          return;
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? { ...m, error: e instanceof Error ? e.message : String(e), status: 'error' as const }
              : m
          )
        );
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [resolveCityForQuery, scrollToBottomIfNeeded, upsertStreamingSection]
  );

  // URL 첫 진입: sessionStorage 복원 또는 최초 검색
  useEffect(() => {
    if (!initialQuery) return;

    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (parsed.length > 0) {
          setMessages(parsed.map((m) => ({ ...m, restored: true })));
          initialSearchDone.current = true;
          return;
        }
      }
    } catch {
      /* ignore */
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
    scrollToBottomIfNeeded();
  }, [messages, scrollToBottomIfNeeded]);

  const handleIntroComplete = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m;
        return {
          ...m,
          introReady: true,
          streamed: true,
          status: m.status === 'loading' ? ('streaming' as const) : m.status,
        };
      })
    );
    requestAnimationFrame(() => scrollToBottomIfNeeded());
  }, [scrollToBottomIfNeeded]);

  const handleRefClick = (messageId: string, id: number) => {
    window.dispatchEvent(
      new CustomEvent('tripmoa:openSources', { detail: { messageId } })
    );

    const highlight = (el: HTMLElement) => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.background = '#f0f9ff';
      el.style.boxShadow = '0 0 0 0.3px #64d4f5';
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
      if (attempt < 12) {
        setTimeout(() => tryScroll(attempt + 1), 100);
        return;
      }
      document.getElementById('source-list')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    setTimeout(() => tryScroll(), 50);
  };

  const handleFollowUpClick = (text: string) => {
    if (loading) return;
    trackFollowUpClick(text);
    setInputValue('');
    runSearch(text);
  };

  const handleStopSearch = () => {
    trackEvent('stop_search', { query: inputValue.trim() });
    abortControllerRef.current?.abort();
  };

  const handleNewSearch = () => {
    if (!inputValue.trim() || loading) return;
    trackEvent('search_submit', { query: inputValue.trim(), query_length: inputValue.trim().length, screen: 'result' });
    runSearch(inputValue);
    setInputValue('');
  };

  return (
    <main className={styles.screen}>
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => {
            trackEvent('click_back', { screen: 'result' });
            router.back();
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span
          className={styles.headerWordmark}
          onClick={() => {
            trackEvent('click_home_wordmark', { screen: 'result' });
            router.push('/prototype/home');
          }}
        >
          <span className={styles.wTrip}>Trip</span>
          <span className={styles.wMoa}> MOA</span>
        </span>
      </div>

      <div className={styles.chatWrap}>
        {messages.map((msg, idx) => (
          <MessageTurn
            key={msg.id}
            msg={msg}
            city={resolveCityForQuery(msg.query)}
            isLast={idx === messages.length - 1 && messages.length >= 2}
            searchId={msg.result?.search_id ?? null}
            onRefClick={handleRefClick}
            onFollowUpClick={handleFollowUpClick}
            onSourceClick={trackSourceClick}
            onIntroComplete={handleIntroComplete}
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
            type="button"
            className={loading ? styles.stopBtn : styles.submitBtn}
            onClick={loading ? handleStopSearch : handleNewSearch}
            disabled={loading ? false : !inputValue.trim()}
            aria-label={loading ? '검색 중지' : '검색'}
          >
            {loading ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <rect x="5" y="5" width="14" height="14" rx="2" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M12 2.5l1.9 5.4a3 3 0 001.8 1.8l5.4 1.9-5.4 1.9a3 3 0 00-1.8 1.8L12 20.7l-1.9-5.4a3 3 0 00-1.8-1.8L2.9 11.6l5.4-1.9a3 3 0 001.8-1.8L12 2.5z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className={styles.screen}>
          <div className={styles.suspenseFallback}>불러오는 중…</div>
          <BottomNav />
        </main>
      }
    >
      <ResultInner />
    </Suspense>
  );
}