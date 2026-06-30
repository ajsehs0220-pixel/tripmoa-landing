'use client';

import { useState } from 'react';

// ── 테스트용: endpoint를 코드에 직접 박음 (본격 UI 갈 때 .env로 분리) ──
const API_URL = 'https://eeesytripmoa-project-production.up.railway.app/search';

// 백엔드 응답 타입
type Source = { link: string; text: string };
type SearchResponse = { answer: string; sources: Source[] };

export default function TestSearchPage() {
  const [query, setQuery] = useState('오사카 맛집');
  const [city, setCity] = useState('오사카');
  const [category, setCategory] = useState(''); // 비워두면 안 보냄
  const [travelStyle, setTravelStyle] = useState(''); // 비워두면 안 보냄
  const [matchCount, setMatchCount] = useState(5);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [rawJson, setRawJson] = useState<string>(''); // 디버깅용 원본 응답

  async function handleSearch() {
    setLoading(true);
    setError(null);
    setResult(null);
    setRawJson('');

    // ── 빈 필터 버그 회피: 빈 값은 body에서 아예 제외 ──
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
      setRawJson(text); // 무슨 일이 나든 원본은 보여줌

      if (!res.ok) {
        setError(`서버 에러 ${res.status}: ${text.slice(0, 300)}`);
        return;
      }

      const data = JSON.parse(text) as SearchResponse;
      setResult(data);
    } catch (e) {
      // CORS 차단, 네트워크 끊김, JSON 파싱 실패 등 전부 여기로
      setError(`요청 실패: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoading(false);
    }
  }

  // sources가 배열이 아니거나 link가 깨져 나와도 안 터지게 방어
  const safeSources: Source[] = Array.isArray(result?.sources)
    ? result!.sources.filter((s) => s && typeof s.link === 'string')
    : [];

  // 혹시 link에 마크다운 래핑이 섞여 나오면 순수 URL만 추출 (지금은 깨끗하지만 보험)
  function cleanUrl(raw: string): string {
    const m = raw.match(/https?:\/\/[^\s)\]]+/);
    return m ? m[0] : raw;
  }

  // GA4 출처링크 클릭 이벤트 (NSM) — gtag 있으면 발사
  function trackSourceClick(url: string) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_source_link', { source_url: url });
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '40px auto', padding: '0 16px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>🔧 검색 연동 테스트</h1>
      <p style={{ color: '#666', fontSize: 13, marginBottom: 20 }}>
        Railway endpoint 실호출 검증용. 디자인 X, 기능만.
      </p>

      {/* 입력 */}
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

      <button onClick={handleSearch} disabled={loading} style={btn}>
        {loading ? '검색 중…' : '검색'}
      </button>

      {/* 상태별 출력 */}
      <div style={{ marginTop: 24 }}>
        {loading && <p style={{ color: '#0070E0' }}>⏳ 백엔드 호출 중…</p>}

        {error && (
          <div style={{ background: '#FDECEA', color: '#B71C1C', padding: 12, borderRadius: 8, fontSize: 13 }}>
            ❌ {error}
          </div>
        )}

        {result && (
          <>
            {/* answer */}
            <section style={{ marginBottom: 24 }}>
              <h2 style={h2}>📝 요약 (answer)</h2>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: 14 }}>
                {result.answer || '(answer 비어있음)'}
              </div>
            </section>

            {/* sources */}
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
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackSourceClick(url)}
                          style={{ color: '#0070E0', fontSize: 13, wordBreak: 'break-all' }}
                        >
                          {url}
                        </a>
                        <p style={{ margin: '6px 0 0', fontSize: 13, color: '#333', whiteSpace: 'pre-wrap' }}>
                          {s.text}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </>
        )}

        {/* 디버깅용 원본 응답 (접어둠) */}
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

// ── 인라인 스타일 (테스트용이라 CSS 파일 안 만듦) ──
const lbl: React.CSSProperties = { display: 'grid', gap: 4, fontSize: 12, color: '#555' };
const inp: React.CSSProperties = { padding: '8px 10px', border: '1px solid #ccc', borderRadius: 6, fontSize: 14 };
const btn: React.CSSProperties = { padding: '10px 20px', background: '#0070E0', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, cursor: 'pointer' };
const h2: React.CSSProperties = { fontSize: 15, marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 4 };
const card: React.CSSProperties = { border: '1px solid #eee', borderRadius: 8, padding: 12, background: '#fafafa' };