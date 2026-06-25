'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './result.module.css';
import { search } from '@/lib/searchClient';
import BottomNav from '@/components/prototype/BottomNav';
// MapView는 구글맵 스크립트 로딩(useLoadScript)을 거쳐야 해서 MapLoader를 통해 렌더
import MapLoader from '@/components/MapLoader';

// ── 새 백엔드 스키마 (schema.py 기준, 2026-06-25) ──
type TableData = { headers: string[]; rows: string[][] };
type Section = { icon: string; title: string; content: string; table: TableData | null };
type Place = { day: number | null; name: string; lat: number; lng: number; photo_url: string | null; description: string };
type Source = { id: number; title: string; channel: string; date: string; link: string };
type SearchResponse = {
  summary: string;
  sections: Section[];
  warning: string[];
  places: Place[] | null;
  follow_up: string[];
  sources: Source[];
};

// 차별점 ①: channel 값으로 카페/블로그 판별 (백엔드가 이제 직접 channel 문자열을 줌)
function sourceBadge(channel: string): { label: string; cls: string } {
  if (channel?.includes('카페')) return { label: '네이버 카페', cls: styles.badgeCafe };
  if (channel?.includes('블로그')) return { label: '네이버 블로그', cls: styles.badgeBlog };
  return { label: channel || '웹', cls: styles.badgeEtc };
}

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

// [ref:1][ref:2] 같은 인라인 인용 마커를 클릭 가능한 숫자 뱃지로 변환
function renderContentWithRefs(content: string, onRefClick: (id: number) => void) {
  const parts = content.split(/(\[ref:\d+\])/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[ref:(\d+)\]$/);
    if (!m) return <span key={i}>{part}</span>;
    const id = Number(m[1]);
    return (
      <button
        key={i}
        type="button"
        className={styles.refBadge}
        onClick={() => onRefClick(id)}
        aria-label={`출처 ${id}번 보기`}
      >
        {id}
      </button>
    );
  });
}

function ResultInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuery = params.get('q') ?? '';
  const city = params.get('city') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResponse | null>(null);

  useEffect(() => {
    if (!query) { setLoading(false); return; }

    setLoading(true);
    setError(null);

    search({ query, city, match_count: 5 })
      .then((data) => setResult(data))
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [query, city]);

  const sections: Section[] = Array.isArray(result?.sections) ? result!.sections : [];
  const sources: Source[] = Array.isArray(result?.sources) ? result!.sources : [];
  const warnings: string[] = Array.isArray(result?.warning) ? result!.warning : [];
  const places: Place[] = Array.isArray(result?.places) ? result!.places! : [];
  const followUps: string[] = Array.isArray(result?.follow_up) ? result!.follow_up : [];

  // ref 번호 클릭 → 해당 출처 카드로 스크롤 + 하이라이트
  const handleRefClick = (id: number) => {
    const el = document.getElementById(`source-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add(styles.sourceHighlight);
    setTimeout(() => el.classList.remove(styles.sourceHighlight), 1500);
  };

  // 후속 질문 클릭 → 같은 화면에서 재검색
  const handleFollowUpClick = (text: string) => {
    trackFollowUpClick(text);
    setQuery(text);
  };

  return (
    <main className={styles.screen}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push('/prototype/home')} aria-label="홈으로">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className={styles.headerWordmark}>
          <span className={styles.wTrip}>Trip</span><span className={styles.wMoa}>MOA</span>
        </span>
      </div>

      {/* 유저 질문 말풍선 */}
      {query && (
        <div className={styles.queryBubble}>
          {city ? `[${city}] ` : ''}{query}
        </div>
      )}

      {/* 로딩 */}
      {loading && (
        <div className={styles.loading}>
          <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
          AI가 실후기를 분석하고 있어요…
        </div>
      )}

      {/* 에러 */}
      {error && <div className={styles.error}>요청 실패: {error}</div>}

      {/* 결과 */}
      {!loading && !error && result && (
        <>
          {/* summary — 한 줄 핵심 요약 */}
          {result.summary && (
            <p className={styles.summary}>{result.summary}</p>
          )}

          {/* warning — 막차/예약마감 등 주의사항 배너 */}
          {warnings.length > 0 && (
            <div className={styles.warningBox}>
              {warnings.map((w, i) => (
                <p key={i} className={styles.warningItem}>⚠️ {w}</p>
              ))}
            </div>
          )}

          {/* sections — 카테고리별 카드 (icon + title + content + table) */}
          {sections.length === 0 ? (
            <p className={styles.empty}>매칭되는 후기를 찾지 못했어요. 검색어를 바꿔보세요.</p>
          ) : (
            <div className={styles.sectionList}>
              {sections.map((sec, i) => (
                <div key={i} className={styles.sectionCard}>
                  <h3 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>{sec.icon}</span>
                    {sec.title}
                  </h3>

                  <p className={styles.sectionContent}>
                    {renderContentWithRefs(sec.content, handleRefClick)}
                  </p>

                  {sec.table && (
                    <div className={styles.tableWrap}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            {sec.table.headers.map((h, hi) => <th key={hi}>{h}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {sec.table.rows.map((row, ri) => (
                            <tr key={ri}>
                              {row.map((cell, ci) => (
                                <td key={ci}>{renderContentWithRefs(cell, handleRefClick)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* places — 장소 카드 + 지도 (좌표가 응답에 직접 포함됨) */}
          {places.length > 0 && (
            <div className={styles.placesBlock}>
              <h2 className={styles.placesTitle}>📍 관련 장소</h2>

              {/* MapView는 image 필드를 InfoWindow 썸네일로 쓰므로 photo_url → image 매핑 */}
              <div className={styles.mapContainer}>
                <MapLoader
                  locations={places.map((p) => ({
                    name: p.name,
                    lat: p.lat,
                    lng: p.lng,
                    image: p.photo_url,
                    day: p.day,
                  }))}
                />
              </div>

              <div className={styles.placeCardList}>
                {places.map((p, i) => (
                  <div key={i} className={styles.placeCard}>
                    {p.photo_url && (
                      <img className={styles.placeImg} src={p.photo_url} alt={p.name} loading="lazy" />
                    )}
                    <div className={styles.placeInfo}>
                      <div className={styles.placeNameRow}>
                        {p.day != null && <span className={styles.placeDay}>Day {p.day}</span>}
                        <span className={styles.placeName}>{p.name}</span>
                      </div>
                      {p.description && <p className={styles.placeDesc}>{p.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* follow_up — 후속 질문 칩 (클릭 시 재검색) */}
          {followUps.length > 0 && (
            <div className={styles.followUpBlock}>
              <h2 className={styles.followUpTitle}>이런 것도 궁금하지 않아요?</h2>
              <div className={styles.followUpChips}>
                {followUps.map((f, i) => (
                  <button
                    key={i}
                    type="button"
                    className={styles.followUpChip}
                    onClick={() => handleFollowUpClick(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* sources — 차별점 ①②③ */}
          <h2 className={styles.sourcesTitle}>실제 후기 출처 ({sources.length})</h2>
          {sources.length === 0 ? (
            <p className={styles.empty}>매칭되는 후기를 찾지 못했어요. 검색어를 바꿔보세요.</p>
          ) : (
            <div className={styles.sourceList}>
              {sources.map((s) => {
                const badge = sourceBadge(s.channel);
                return (
                  <div key={s.id} id={`source-${s.id}`} className={styles.sourceCard}>
                    <div className={styles.sourceMeta}>
                      {/* ① 카페/블로그 */}
                      <span className={`${styles.badge} ${badge.cls}`}>{badge.label}</span>
                      {/* ③ 날짜 — 이제 백엔드가 항상 채워서 줌 */}
                      <span className={styles.date}>{s.date}</span>
                    </div>
                    <p className={styles.sourceText}>{s.title}</p>
                    {/* ② 원문 링크 */}
                    <a
                      className={styles.sourceLink}
                      href={s.link} target="_blank" rel="noopener noreferrer"
                      onClick={() => trackSourceClick(s.link)}
                    >
                      원문 보기 →
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* 쿼리 없이 직접 들어온 경우 */}
      {!loading && !query && (
        <p className={styles.empty}>검색어가 없어요. <button className={styles.backBtn} onClick={() => router.push('/prototype/home')}>홈으로</button></p>
      )}

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}

// useSearchParams 는 Suspense 경계가 필요함 (Next.js 규칙)
export default function ResultPage() {
  return (
    <Suspense fallback={<main className={styles.screen}><div className={styles.loading}>불러오는 중…</div></main>}>
      <ResultInner />
    </Suspense>
  );
}