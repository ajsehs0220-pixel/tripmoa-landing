/** 실후기 vs 질문·일정 나열·의견 구분 + 장소 관련성 (reviewFilter.js와 동일 규칙) */

const ITINERARY_DUMP_PATTERN =
  /(?:\/|->|→).*(?:\/|->|→)|주차장-|복귀.*취침|저녁식사후|하부\s*무료/i;

const STRICT_QUESTION_PATTERN =
  /[?？]|궁금합니다|궁금해요|궁금한|할까요|될까요|을까요|를까요|인지\s*궁금|할까\?|될까\?|어떻게\s*해야|알려주세요/i;

const STRICT_OPINION_PATTERN = /포기하면|이견|넣고\s*싶은데|넣고\s*싶어/;

const MIN_PLACE_REVIEWS = 2;
const MAX_PLACE_REVIEWS = 3;

const SKIP_MATCH_TOKENS = new Set([
  '본점', '지점', '점', '마쓰야마', '오사카', '교토', '도쿄', '후쿠오카', '나고야',
  '삿포로', '오키나와', '일본', '여행', '식당', '카페', '레스토랑', '호텔', '숙소',
]);

const DESSERT_MARKERS =
  /(?:말차|모찌|아이스크림|케이크|디저트|마카롱|와플|빙수|パフェ|パンケーキ)/i;

const SAVORY_MARKERS =
  /(?:도미밥|타이메시|타마고|냉면|라멘|스시|초밥|회|우동|소바|丼|焼き|定食|고기|삼겹|갈비)/i;

export type PickPlaceReviewsOptions = {
  placeName?: string;
  description?: string;
};

export function isRelaxedReviewText(text: string): boolean {
  const t = (text ?? '').trim();
  if (t.length < 8) return false;
  if (ITINERARY_DUMP_PATTERN.test(t)) return false;
  if ((t.match(/\//g) ?? []).length >= 3) return false;
  if (/폭포.*\/.*호수|호수.*\/.*폭포/i.test(t)) return false;
  if (/[?？]/.test(t)) return false;
  return true;
}

export function isValidReviewText(text: string): boolean {
  const t = (text ?? '').trim();
  if (!isRelaxedReviewText(t)) return false;
  if (STRICT_QUESTION_PATTERN.test(t)) return false;
  if (STRICT_OPINION_PATTERN.test(t)) return false;
  return true;
}

export function extractPlaceMatchTerms(placeName: string, description = ''): string[] {
  const terms = new Set<string>();
  const name = (placeName ?? '').replace(/\*\*/g, '').trim();
  const desc = (description ?? '').replace(/\s*\[ref:\d+\]/g, '').replace(/\*\*/g, '').trim();

  const add = (raw: string) => {
    const cleaned = raw.replace(/(?:본점|지점|점)$/g, '').trim();
    if (cleaned.length >= 2 && !SKIP_MATCH_TOKENS.has(cleaned)) terms.add(cleaned);
  };

  for (const part of name.split(/[\s·・/]+/)) add(part);

  const chunks = `${name} ${desc}`.match(/[가-힣]{2,}|[a-zA-Z]{3,}|[ぁ-んァ-ン一-龯]{2,}/g) ?? [];
  for (const w of chunks) add(w);

  return [...terms];
}

export function isReviewRelevantToPlace(
  text: string,
  placeName: string,
  description = ''
): boolean {
  const review = (text ?? '').trim();
  if (!review) return false;

  const terms = extractPlaceMatchTerms(placeName, description);
  if (terms.length === 0) return true;

  if (terms.some((t) => review.includes(t))) return true;

  const context = `${placeName} ${description}`;
  const placeSavory = SAVORY_MARKERS.test(context);
  const placeDessert = DESSERT_MARKERS.test(context);

  if (placeSavory && DESSERT_MARKERS.test(review) && !SAVORY_MARKERS.test(review)) {
    return false;
  }
  if (placeDessert && SAVORY_MARKERS.test(review) && !DESSERT_MARKERS.test(review)) {
    return false;
  }

  return false;
}

export function filterValidReviews<T extends { text?: string }>(reviews: T[]): T[] {
  return reviews.filter((r) => isValidReviewText(r.text ?? ''));
}

export function pickPlaceReviews<T extends { text?: string }>(
  reviews: T[],
  options: PickPlaceReviewsOptions = {}
): T[] {
  if (!Array.isArray(reviews)) return [];

  const placeName = options.placeName ?? '';
  const description = options.description ?? '';
  const hasPlaceContext = Boolean(placeName.trim());

  const isRelevant = (r: T) =>
    !hasPlaceContext || isReviewRelevantToPlace(r.text ?? '', placeName, description);

  const strict: T[] = [];
  const relaxedPool: T[] = [];
  const rawPool: T[] = [];

  for (const r of reviews) {
    const text = (r.text ?? '').trim();
    if (!text || !isRelevant(r)) continue;

    rawPool.push(r);
    if (isValidReviewText(text)) strict.push(r);
    else if (isRelaxedReviewText(text)) relaxedPool.push(r);
  }

  const out = strict.slice(0, MAX_PLACE_REVIEWS);
  const seen = new Set(out.map((r) => (r.text ?? '').trim()));

  const append = (r: T) => {
    const text = (r.text ?? '').trim();
    if (!text || seen.has(text)) return;
    out.push(r);
    seen.add(text);
  };

  for (const r of relaxedPool) {
    if (out.length >= MAX_PLACE_REVIEWS) break;
    append(r);
  }

  if (out.length < MIN_PLACE_REVIEWS) {
    for (const r of rawPool) {
      if (out.length >= MIN_PLACE_REVIEWS) break;
      const text = (r.text ?? '').trim();
      if (text.length < 8 || seen.has(text)) continue;
      if (STRICT_QUESTION_PATTERN.test(text)) continue;
      if (ITINERARY_DUMP_PATTERN.test(text)) continue;
      append(r);
    }
  }

  return out.slice(0, MAX_PLACE_REVIEWS);
}
