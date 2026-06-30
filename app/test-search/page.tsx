'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = 'https://eeesytripmoa-project-production.up.railway.app/search';

type Source = {
  id?: number;
  title?: string;
  channel?: string;
  date?: string;
  link: string;
};

type SearchResponse = {
  summary?: string;
  answer?: string;
  sections?: unknown[];
  sources?: Source[];
  youtube_videos?: { title?: string; url?: string }[];
  warning?: string[];
  follow_up?: string[];
};

export default function TestSearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('오사카 맛집');
  const [city, setCity] = useState('오사카');
  const [category, setCategory] = useState('');
  const [travelStyle, setTravelStyle] = useState('');
  const [matchCount, setMatchCount] = useState(5);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [rawJson, setRawJson] = useState('');

  function openStyledResult() {
    const q = query.trim();
    if (!q) return;
    const params = new URLSearchParams({ q });
    if (city.trim()) params.set('city', city.trim());
    router.push(`/prototype/result?${params.toString()}`);
  }

  async function handleRawApiTest() {
    setLoading(true);
    setError(null);
    setResult(null);
    setRawJson('');

    const body: Record<string, unknown> = {
      query,
      city,
      match_count: matchCount,
    };
    if (category.trim()) body.category = category.trim();
    if (travelStyle.trim()) body.travel_style = travelStyle.trim();

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      setRawJson(text);

      if (!res.ok) {
        setError(`서버 에러 ${res.status}: ${text.slice(0, 300)}`);
        return;
      }

      const data = JSON.parse(text) as SearchResponse;
      setResult(data);
    } catch (e) {
      setError(`요청 실패: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoading(false);
    }
  }

  const safeSources: Source[] = Array.isArray(result?.sources)
    ? result!.sources.filter((s) => s && typeof s.link === 'string')
    : [];

  const summaryText = result?.summary ?? result?.answer ?? '';

  function cleanUrl(raw: string): string {
    const m = raw.match(/https?:\/\/[^\s)\]]+/);
    return m ? m[0] : raw;
  }

  function trackSourceClick(url: string) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_source_link', { source_url: url });
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '40px auto', padding: '0 16px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>🔧 검색 연동 테스트</h1>
      <p style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>
        스타일 적용 UI는 <strong>/prototype/result</strong> 입니다. 이 페이지는 Raw API 검증용입니다.
      </p>
      <p style={{ marginBottom: 20 }}>
        <a href="/prototype/home" style={{ color: '#0070E0', fontSize: 13 }}>
          → 프로토타입 홈으로 이동
        </a>
      </p>

      <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
        <label style={lbl}>
          query (검색어) *
          <input style={inp} value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <label style={lbl}>
          city (도시) *
          <input style={inp} value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label style={lbl}>
          category (비우면 미전송)
          <input style={inp} value={category} onChange={(e) => setCategory(e.target.value)} placeholder="예: 맛집 / 숙소 / 일정 / 교통" />
        </label>
        <label style={lbl}>
          travel_style (비우면 미전송)
          <input style={inp} value={travelStyle} onChange={(e) => setTravelStyle(e.target.value)} placeholder="예: 혼자 / 친구 / 가족" />
        </label>
        <label style={lbl}>
          match_count
          <input style={inp} type="number" value={matchCount} onChange={(e) => setMatchCount(Number(e.target.value))} />
        </label>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={openStyledResult} style={btnPrimary}>
          검색 (스타일 UI)
        </button>
        <button onClick={handleRawApiTest} disabled={loading} style={btnSecondary}>
          {loading ? '호출 중…' : 'Raw API만 테스트'}
        </button>
      </div>

      <div style={{ marginTop: 24 }}>
        {loading && <p style={{ color: '#0070E0' }}>⏳ 백엔드 호출 중…</p>}

        {error && (
          <div style={{ background: '#FDECEA', color: '#B71C1C', padding: 12, borderRadius: 8, fontSize: 13 }}>
            ❌ {error}
          </div>
        )}

        {result && (
          <>
            <section style={{ marginBottom: 24 }}>
              <h2 style={h2}>📝 요약 (summary)</h2>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: 14 }}>
                {summaryText || '(summary 비어있음)'}
              </div>
            </section>

            {Array.isArray(result.youtube_videos) && result.youtube_videos.length > 0 && (
              <section style={{ marginBottom: 24 }}>
                <h2 style={h2}>🎬 유튜브 ({result.youtube_videos.length}건)</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
                  {result.youtube_videos.map((v, i) => (
                    <li key={i} style={card}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{v.title || '(제목 없음)'}</p>
                      {v.url && (
                        <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontSize: 13 }}>
                          {v.url}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h2 style={h2}>🔗 출처 ({safeSources.length}건)</h2>
              {safeSources.length === 0 ? (
                <p style={{ color: '#999', fontSize: 13 }}>
                  결과 없음 — 검색어/도시 조합에 매칭되는 후기가 없거나, 재임베딩 진행 중일 수 있음.
                </p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 10 }}>
                  {safeSources.map((s, i) => {
                    const url = cleanUrl(s.link);
                    return (
                      <li key={i} style={card}>
                        {s.title && (
                          <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600 }}>{s.title}</p>
                        )}
                        {(s.channel || s.date) && (
                          <p style={{ margin: '0 0 6px', fontSize: 12, color: '#666' }}>
                            {[s.channel, s.date].filter(Boolean).join(' · ')}
                          </p>
                        )}
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackSourceClick(url)}
                          style={{ color: '#2563eb', fontSize: 13, wordBreak: 'break-all', textDecoration: 'underline' }}
                        >
                          {url}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </>
        )}

        {rawJson && (
          <details style={{ marginTop: 24 }}>
            <summary style={{ cursor: 'pointer', fontSize: 12, color: '#999' }}>🐛 원본 응답 JSON 보기</summary>
            <pre style={{ background: '#16181D', color: '#E0E0E0', padding: 12, borderRadius: 8, fontSize: 11, overflow: 'auto', marginTop: 8 }}>
              {rawJson}
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}

const lbl: React.CSSProperties = { display: 'grid', gap: 4, fontSize: 12, color: '#555' };
const inp: React.CSSProperties = { padding: '8px 10px', border: '1px solid #ccc', borderRadius: 6, fontSize: 14 };
const btnPrimary: React.CSSProperties = { padding: '10px 20px', background: '#0070E0', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, cursor: 'pointer' };
const btnSecondary: React.CSSProperties = { padding: '10px 20px', background: '#fff', color: '#333', border: '1px solid #ccc', borderRadius: 6, fontSize: 14, cursor: 'pointer' };
const h2: React.CSSProperties = { fontSize: 15, marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 4 };
const card: React.CSSProperties = { border: '1px solid #eee', borderRadius: 8, padding: 12, background: '#fafafa' };
