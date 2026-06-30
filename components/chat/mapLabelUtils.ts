const CITY_NAMES = [
  '마쓰야마',
  '오사카',
  '도쿄',
  '교토',
  '후쿠오카',
  '나고야',
  '삿포로',
  '오키나와',
  '시즈오카',
  '고베',
  '나라',
  '히로시마',
  '요코하마',
  '가고시마',
  '벳푸',
  '가나자와',
];

/** 쿼리 본문에서 도시명 추출 (city 파라미터 없을 때 API·표시용) */
export function inferCityFromQuery(query: string): string | undefined {
  const q = query.trim();
  if (!q) return undefined;
  for (const city of CITY_NAMES) {
    if (q.includes(city)) return city;
  }
  return undefined;
}

const TRAILING_REQUEST =
  /(?:\s*(?:추천|알려|찾아|해|줘)\s*(?:줘|주세요|해줘|해\s*주세요|줄\s*래|봐|봐줘))+$/gi;

const TOPIC_WORD =
  /(?:맛집|숙소|호텔|관광지|일정|코스|여행|식당|카페|료칸|숙박|게스트하우스)/;

/** 지도 상단 라벨 — 사용자 질문을 짧은 주제형 문구로 (summary 파싱은 보조만) */
export function formatMapLabel(query: string, summary?: string): string {
  const fromQuery = cleanQueryLabel(query);
  if (fromQuery.length >= 3) return fromQuery;

  const fromSummary = summary?.trim() ? cleanSummaryFallback(summary) : '';
  return fromSummary || query.trim();
}

function cleanQueryLabel(query: string): string {
  let t = query.trim().replace(/^\[[^\]]+\]\s*/, '');

  for (const city of CITY_NAMES) {
    t = t.replace(new RegExp(`^${city}(?:에서|의)?\\s*`, 'i'), '');
  }

  t = t
    .replace(/아이랑\s*같이?\s*갈\s*만한/gi, '아이와 함께 갈만한')
    .replace(/아이랑\s*같이?\s*방문(?:하기)?\s*좋은/gi, '아이와 함께 갈만한')
    .replace(/아이랑/g, '아이와 함께')
    .replace(/같이\s*갈\s*만한/gi, '갈만한')
    .replace(/같이갈\s*만한/gi, '갈만한')
    .replace(/방문하기\s*좋은/gi, '갈만한')
    .replace(/부모님이랑/g, '부모님과')
    .replace(/연인이랑/g, '연인과')
    .replace(/친구랑/g, '친구와')
    .replace(TRAILING_REQUEST, '')
    .replace(/[?？!！.。…]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  t = t.replace(/^에서\s+/, '').replace(/\s+에서\s+/g, ' ');

  return t;
}

/** summary는 쿼리 정리가 안 될 때만 — 문장 중간 자르기 금지 */
function cleanSummaryFallback(summary: string): string {
  let t = summary.split(/[.。,，]/)[0]?.trim() ?? '';

  for (const city of CITY_NAMES) {
    t = t.replace(new RegExp(`^${city}(?:에서|는|은|의)?\\s*`, 'i'), '');
  }

  t = t
    .replace(/(?:이에요|예요|해요|있어요|드려요|입니다)\.?$/g, '')
    .replace(/^에서\s+/, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!t || t.length > 30 || /박|일차|동선/.test(t)) return '';

  const topic = t.match(
    new RegExp(`(?:.{0,18})?${TOPIC_WORD.source}(?:.{0,6})?`)
  );
  return topic?.[0]?.trim() ?? t;
}
