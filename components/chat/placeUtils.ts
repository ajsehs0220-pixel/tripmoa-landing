import type { Place, PlaceDetail } from './types';
import { splitJoinedSentences } from './displayTextUtils';

/** • **장소명** → 설명 / 👉 소제목 / 장소 블록 파싱 */
export type ParsedContentLine =
  | { kind: 'spacer' }
  | { kind: 'subheading'; text: string }
  | { kind: 'place'; bullet: string; placeName: string; description: string }
  | { kind: 'plain'; text: string };

export type ContentItem =
  | { kind: 'spacer' }
  | { kind: 'subheading'; text: string }
  | { kind: 'place'; emoji: string; placeName: string; highlights: string[] }
  | { kind: 'plain'; text: string };

const EMOJI_PREFIX =
  /^(\p{Extended_Pictographic}(?:\uFE0F)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F)?)*)\s+/u;

const PLACE_HEADER =
  /^(?:(\p{Extended_Pictographic}(?:\uFE0F)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F)?)*)\s*)?(?:[•\-]\s*)?\*\*([^*]+)\*\*\s*(?:→\s*(.*))?$/u;

const CATEGORY_EMOJI: [RegExp, string][] = [
  [/맛집|식당|음식|타이메시|라멘|스시|카페|도미밥|메뉴|요리|식사|먹|브런치|디저트|베이커리|타코|오코노미/i, '🍜'],
  [/숙소|호텔|료칸|게스트|잠|숙박|펜션|민박|리조트|inn|야도/i, '🏨'],
  [/관광|신사|사찰|성|박물관|공원|전망|명소|USJ|스튜디오/i, '⛩️'],
  [/쇼핑|마켓|백화점|아울렛|면세/i, '🛍️'],
  [/교통|역|버스|전철|JR|지하철|라인|공항/i, '🚆'],
  [/동선|일정|코스|루트|day|일차/i, '🗺️'],
  [/비용|가격|예산|저렴|가성/i, '💰'],
];

/** 음식/숙박 등 맥락에 맞는 이모지 */
export function inferPlaceEmoji(text: string, sectionTitle?: string): string {
  const combined = `${sectionTitle ?? ''} ${text}`;
  for (const [re, emoji] of CATEGORY_EMOJI) {
    if (re.test(combined)) return emoji;
  }
  return '📍';
}

export function isOneLineConclusionLine(text: string): boolean {
  return /한\s*줄\s*결론/i.test((text ?? '').trim());
}

/** "상황별 추천 + 한 줄 결론" → 💡 상황별추천 */
export function formatSectionTitle(title: string, icon?: string): string {
  const t = title.trim();
  if (/상황별\s*추천/i.test(t) && (/결론|한\s*줄/i.test(t) || /[✔💡]/.test(t))) {
    return '💡 상황별추천';
  }
  if (/^[✔💡]\s*상황별/i.test(t)) {
    return '💡 상황별추천';
  }
  if (/여행\s*팁/i.test(t) || /^💡\s*.*팁/i.test(t)) {
    return '💡 여행 팁';
  }
  if (/숙소\s*추천/i.test(t)) {
    return '숙소 추천';
  }
  if (icon === '💡' && !/💡/.test(t)) {
    return `💡 ${t}`;
  }
  return title;
}

export function isLodgingSection(title: string, icon?: string): boolean {
  const t = title.trim();
  return icon === '🏨' || /숙소\s*추천/i.test(t);
}

/** 상황별추천·여행팁 — 본문만, 장소 블록/사진 없음 */
export function isConclusionSection(title: string, icon?: string): boolean {
  const t = title.trim();
  if (
    /상황별\s*추천/i.test(t) ||
    /^[✔💡]\s*상황별/i.test(t) ||
    (icon === '💡' && /상황별|결론/i.test(t))
  ) {
    return true;
  }
  if (
    /여행\s*팁/i.test(t) ||
    /^💡\s*여행\s*팁/i.test(t) ||
    (icon === '💡' && /여행\s*팁|팁|렌터|교통|주의/i.test(t))
  ) {
    return true;
  }
  if (icon === '💡') {
    return true;
  }
  return false;
}

/** content를 장소 블록 단위로 파싱 (장소명 → 불릿 → 사진/리뷰 렌더용) */
export function parseContentItems(
  content: string,
  sectionTitle?: string,
  options?: { itinerary?: boolean }
): ContentItem[] {
  const itinerary = options?.itinerary ?? false;
  const items: ContentItem[] = [];
  let current: Extract<ContentItem, { kind: 'place' }> | null = null;

  const flushPlace = () => {
    if (current) {
      items.push(current);
      current = null;
    }
  };

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushPlace();
      items.push({ kind: 'spacer' });
      continue;
    }

    if (itinerary && isTimeOfDayLabel(trimmed)) {
      continue;
    }

    const sub = trimmed.match(/^👉\s*(.+)$/);
    if (sub) {
      flushPlace();
      items.push({ kind: 'subheading', text: sub[1].trim() });
      continue;
    }

    const headerMatch = trimmed.match(PLACE_HEADER);
    if (headerMatch) {
      flushPlace();
      const emoji = headerMatch[1] ?? inferPlaceEmoji(headerMatch[2], sectionTitle);
      const placeName = normalizePlaceLabel(headerMatch[2]);
      const inlineDesc = stripInlineRefs(headerMatch[3]?.trim() ?? '');
      current = { kind: 'place', emoji, placeName, highlights: [] };
      if (inlineDesc) current.highlights.push(inlineDesc);
      continue;
    }

    const emojiBold = trimmed.match(
      /^(\p{Extended_Pictographic}(?:\uFE0F)?)\s*\*\*([^*]+)\*\*\s*$/u
    );
    if (emojiBold) {
      flushPlace();
      current = {
        kind: 'place',
        emoji: emojiBold[1],
        placeName: normalizePlaceLabel(emojiBold[2]),
        highlights: [],
      };
      continue;
    }

    const emojiPlain = trimmed.match(/^(\p{Extended_Pictographic}(?:\uFE0F)?)\s+(.+)$/u);
    if (emojiPlain && !emojiPlain[2].startsWith('-') && !emojiPlain[2].startsWith('•')) {
      flushPlace();
      const namePart = stripInlineRefs(emojiPlain[2].replace(/\*\*/g, '').trim());
      current = {
        kind: 'place',
        emoji: emojiPlain[1],
        placeName: normalizePlaceLabel(namePart),
        highlights: [],
      };
      continue;
    }

    const highlightMatch = trimmed.match(/^[-•]\s+(.+)$/);
    if (highlightMatch && current) {
      for (const seg of splitLineAtEmbeddedPlace(highlightMatch[1].trim())) {
        const header = parsePlaceHeaderFromLine(seg, sectionTitle);
        if (header) {
          flushPlace();
          current = header;
        } else if (current) {
          current.highlights.push(seg);
        }
      }
      continue;
    }

    if (current && !trimmed.startsWith('✔')) {
      for (const seg of splitLineAtEmbeddedPlace(trimmed)) {
        const header = parsePlaceHeaderFromLine(seg, sectionTitle);
        if (header) {
          flushPlace();
          current = header;
        } else if (current) {
          current.highlights.push(seg);
        }
      }
      continue;
    }

    flushPlace();
    items.push({ kind: 'plain', text: trimmed });
  }

  flushPlace();
  return items;
}

/** 한 place 블록 highlights 안에 🏨 다른장소 → 블록 분리 */
function splitPlaceItemByHeaders(
  item: Extract<ContentItem, { kind: 'place' }>,
  sectionTitle?: string
): Extract<ContentItem, { kind: 'place' }>[] {
  const out: Extract<ContentItem, { kind: 'place' }>[] = [];
  let current: Extract<ContentItem, { kind: 'place' }> = {
    kind: 'place',
    emoji: item.emoji,
    placeName: item.placeName,
    highlights: [],
  };

  const flush = () => {
    if (current.highlights.length > 0 || out.length === 0) {
      out.push({ ...current, highlights: [...current.highlights] });
    }
  };

  for (const line of item.highlights) {
    for (const seg of splitLineAtEmbeddedPlace(line)) {
      const header = parsePlaceHeaderFromLine(seg, sectionTitle);
      if (header && !placeNamesMatch(header.placeName, current.placeName)) {
        flush();
        current = { ...header, highlights: [] };
        continue;
      }
      if (isOtherPlaceHeaderLine(seg, current.placeName)) {
        flush();
        const next = parsePlaceHeaderFromLine(seg, sectionTitle);
        current = next ?? {
          kind: 'place',
          emoji: inferPlaceEmoji(seg, sectionTitle),
          placeName: normalizePlaceLabel(seg),
          highlights: [],
        };
        continue;
      }
      const cleaned = stripTrailingEmbeddedPlace(seg, current.placeName);
      if (cleaned) current.highlights.push(cleaned);
    }
  }

  flush();
  return out.length > 0 ? out : [item];
}

/** content 장소 블록 + places_detail 동기화 — 합쳐진 장소 분리·누락 보충 */
export function expandPlaceItems(
  items: ContentItem[],
  placesDetail?: PlaceDetail[],
  sectionTitle?: string
): ContentItem[] {
  const expanded: ContentItem[] = [];

  for (const item of items) {
    if (item.kind !== 'place') {
      expanded.push(item);
      continue;
    }
    expanded.push(...splitPlaceItemByHeaders(item, sectionTitle));
  }

  for (const pd of placesDetail ?? []) {
    if (!pd.name?.trim()) continue;
    const exists = expanded.some(
      (i) => i.kind === 'place' && placeNamesMatch(i.placeName, pd.name)
    );
    if (exists) continue;
    expanded.push({
      kind: 'place',
      emoji: inferPlaceEmoji(pd.name, sectionTitle),
      placeName: pd.name,
      highlights: descriptionToHighlights(pd.description, pd.name),
    });
  }

  return expanded;
}

/** 카테고리만 있는 줄 (점심 및 쇼핑, 숙소 체크인 등) */
export function isActivityCategoryLabel(name: string): boolean {
  const n = name.trim();
  if (/점심\s*(및|\/|·)|저녁\s*(및|\/|·)|아침\s*(및|\/|·)/i.test(n)) return true;
  if (/숙소\s*체크인|체크\s*인/i.test(n)) return true;
  if (/^(점심|저녁|아침|쇼핑|식사|이동|출국|도착|휴식)$/i.test(n)) return true;
  if (/및\s*(쇼핑|식사|관광)/i.test(n)) return true;
  return false;
}

export function placeItemHasContent(
  item: Extract<ContentItem, { kind: 'place' }>,
  detail?: PlaceDetail
): boolean {
  if (item.highlights.some((h) => stripInlineRefs(h))) return true;
  if (!detail) return false;
  if (detail.description?.trim()) return true;
  if ((detail.reviews?.length ?? 0) > 0) return true;
  return false;
}

export function shouldRenderItineraryPlace(
  item: Extract<ContentItem, { kind: 'place' }>,
  detail?: PlaceDetail
): boolean {
  if (isActivityCategoryLabel(item.placeName)) return false;
  return placeItemHasContent(item, detail);
}

/** 동일 장소명 블록 병합 — 두 번째는 이동 설명만 highlights에 합침 */
export function dedupeItineraryPlaceItems(items: ContentItem[]): ContentItem[] {
  const seen = new Map<string, Extract<ContentItem, { kind: 'place' }>>();
  const result: ContentItem[] = [];

  for (const item of items) {
    if (item.kind !== 'place') {
      result.push(item);
      continue;
    }
    const key = normalizePlaceLabel(item.placeName);
    const prev = seen.get(key);
    if (prev) {
      for (const h of item.highlights) {
        const t = h.trim();
        if (t && !prev.highlights.some((x) => x.trim() === t)) {
          prev.highlights.push(h);
        }
      }
      continue;
    }
    const copy: Extract<ContentItem, { kind: 'place' }> = {
      ...item,
      highlights: [...item.highlights],
    };
    seen.set(key, copy);
    result.push(copy);
  }
  return result;
}

export function prepareItineraryContentItems(
  items: ContentItem[],
  placesDetail?: PlaceDetail[]
): ContentItem[] {
  return dedupeItineraryPlaceItems(items).filter((item) => {
    if (item.kind !== 'place') return true;
    return shouldRenderItineraryPlace(item, findPlaceDetail(item.placeName, placesDetail));
  });
}

export function parseContentLine(line: string): ParsedContentLine {
  const trimmed = line.trim();
  if (!trimmed) return { kind: 'spacer' };

  const sub = trimmed.match(/^👉\s*(.+)$/);
  if (sub) return { kind: 'subheading', text: sub[1].trim() };

  const placeMatch = trimmed.match(/^[•\-]\s*\*\*([^*]+)\*\*\s*(?:→\s*)?(.*)$/);
  if (placeMatch) {
    return {
      kind: 'place',
      bullet: trimmed.startsWith('-') ? '-' : '•',
      placeName: normalizePlaceLabel(placeMatch[1]),
      description: placeMatch[2].trim(),
    };
  }

  return { kind: 'plain', text: trimmed };
}

/** places_detail.name ↔ content **장소명** 매칭 */
export function findPlaceDetail(
  label: string,
  details: PlaceDetail[] | undefined
): PlaceDetail | undefined {
  if (!details?.length) return undefined;
  const name = normalizePlaceLabel(label);
  if (!name) return undefined;

  const exact = details.find((p) => normalizePlaceLabel(p.name) === name);
  if (exact) return exact;

  return details.find((p) => {
    const pn = normalizePlaceLabel(p.name);
    if (pn.length < 3 || name.length < 3) return pn === name;
    return pn.includes(name) || name.includes(pn);
  });
}

/** 장소명·제목 줄에서 [ref:N] 제거 */
export function stripInlineRefs(text: string): string {
  return text.replace(/\s*(?:\[ref:\d+\])+\s*/g, ' ').replace(/\s+/g, ' ').trim();
}

const PLACE_EMOJI_HEADER =
  /^(\p{Extended_Pictographic}(?:\uFE0F)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F)?)*)\s+(?:\*\*([^*]+)\*\*|(.+?))\s*$/u;

const EMBEDDED_PLACE_IN_LINE =
  /\s(\p{Extended_Pictographic}(?:\uFE0F)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F)?)*)\s+(?:\*\*([^*]+)\*\*|([^\n•\-]+))/u;

function placeNamesMatch(a: string, b: string): boolean {
  const na = normalizePlaceLabel(a);
  const nb = normalizePlaceLabel(b);
  if (!na || !nb) return false;
  return na === nb || na.includes(nb) || nb.includes(na);
}

/** 줄이 다른 장소 헤더(🏨 호텔명)인지 */
function isOtherPlaceHeaderLine(line: string, placeName: string): boolean {
  const trimmed = line.trim();
  const m = trimmed.match(PLACE_EMOJI_HEADER);
  if (!m) return false;
  const name = normalizePlaceLabel(m[2] ?? m[3] ?? '');
  if (!name) return false;
  return !placeNamesMatch(name, placeName);
}

/** "…설명 🏨 다른호텔 …" → 앞 설명만 */
function stripTrailingEmbeddedPlace(line: string, placeName: string): string {
  const idx = line.search(EMBEDDED_PLACE_IN_LINE);
  if (idx < 0) return line.trim();
  const tail = line.slice(idx).trim();
  const m = tail.match(PLACE_EMOJI_HEADER);
  if (!m) return line.trim();
  const embeddedName = normalizePlaceLabel(m[2] ?? m[3] ?? '');
  if (embeddedName && !placeNamesMatch(embeddedName, placeName)) {
    return line.slice(0, idx).trim();
  }
  return line.trim();
}

/** description / highlights — 해당 장소만 남김 */
export function filterHighlightsForPlace(lines: string[], placeName: string): string[] {
  const out: string[] = [];
  for (const raw of lines) {
    let line = (raw ?? '').trim();
    if (!line) continue;
    if (isOtherPlaceHeaderLine(line, placeName)) break;
    line = stripTrailingEmbeddedPlace(line, placeName);
    if (!line || isOtherPlaceHeaderLine(line, placeName)) continue;
    out.push(line);
  }
  return out;
}

/** description을 🏨/🍜 헤더 기준 블록으로 분리 */
export function splitDescriptionByPlaceHeaders(text: string): { name: string; lines: string[] }[] {
  const blocks: { name: string; lines: string[] }[] = [];

  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const header = trimmed.match(PLACE_EMOJI_HEADER);
    if (header) {
      blocks.push({
        name: normalizePlaceLabel(header[2] ?? header[3] ?? ''),
        lines: [],
      });
      continue;
    }

    const embedded = trimmed.match(EMBEDDED_PLACE_IN_LINE);
    if (embedded) {
      const before = trimmed.slice(0, embedded.index ?? 0).trim();
      const tail = blocks[blocks.length - 1];
      if (before && tail) tail.lines.push(before);
      blocks.push({
        name: normalizePlaceLabel(embedded[2] ?? embedded[3] ?? ''),
        lines: [],
      });
      continue;
    }

    const last = blocks[blocks.length - 1];
    if (last) last.lines.push(trimmed);
    else blocks.push({ name: '', lines: [trimmed] });
  }

  return blocks;
}

/** places_detail.description → 해당 장소 설명 불릿만 */
export function descriptionToHighlights(description: string | undefined, placeName?: string): string[] {
  if (!description?.trim()) return [];

  const blocks = splitDescriptionByPlaceHeaders(description);
  if (placeName && blocks.length > 1) {
    const block = blocks.find((b) => b.name && placeNamesMatch(b.name, placeName));
    if (block) {
      return filterHighlightsForPlace(block.lines, placeName);
    }
  }

  const lines = description
    .split(/\n+/)
    .flatMap((line) => splitJoinedSentences(line))
    .map((s) => s.trim())
    .filter(Boolean);

  return placeName ? filterHighlightsForPlace(lines, placeName) : lines;
}

/** content 한 줄에 다른 장소가 붙어 있으면 분리 */
function splitLineAtEmbeddedPlace(line: string): string[] {
  const parts: string[] = [];
  let rest = line.trim();
  while (rest) {
    const m = rest.match(EMBEDDED_PLACE_IN_LINE);
    if (!m || m.index == null || m.index === 0) {
      parts.push(rest);
      break;
    }
    const before = rest.slice(0, m.index).trim();
    if (before) parts.push(before);
    rest = rest.slice(m.index).trim();
  }
  return parts;
}

function parsePlaceHeaderFromLine(line: string, sectionTitle?: string): Extract<ContentItem, { kind: 'place' }> | null {
  const trimmed = line.trim();
  const headerMatch = trimmed.match(PLACE_HEADER);
  if (headerMatch) {
    const emoji = headerMatch[1] ?? inferPlaceEmoji(headerMatch[2], sectionTitle);
    return {
      kind: 'place',
      emoji,
      placeName: normalizePlaceLabel(headerMatch[2]),
      highlights: [],
    };
  }
  const emojiHeader = trimmed.match(PLACE_EMOJI_HEADER);
  if (emojiHeader) {
    return {
      kind: 'place',
      emoji: emojiHeader[1],
      placeName: normalizePlaceLabel(emojiHeader[2] ?? emojiHeader[3] ?? ''),
      highlights: [],
    };
  }
  return null;
}

const TIME_OF_DAY_LABEL = /^(오전|오후|저녁|아침|점심|밤)(?:\s*[\/·]\s*(오전|오후|저녁|아침|점심|밤))*$/i;

export function isTimeOfDayLabel(text: string): boolean {
  return TIME_OF_DAY_LABEL.test(text.trim());
}

/** 백엔드 places.name / content **장소명** 비교용 정규화 */
export function normalizePlaceLabel(label: string): string {
  return stripInlineRefs(
    label
      .trim()
      .replace(/^\d+\.\s*/, '')
      .replace(/\s+/g, ' ')
  );
}

export function matchPlace(label: string, places: Place[]): Place | undefined {
  const name = normalizePlaceLabel(label);
  if (!name) return undefined;

  return places.find((p) => {
    const placeName = normalizePlaceLabel(p.name);
    return (
      placeName === name ||
      placeName.includes(name) ||
      name.includes(placeName)
    );
  });
}

/** • **장소명** → / - **장소명** / **1. 장소명** 등에서 장소명 추출 */
export function extractPlaceName(line: string): string | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('👉')) return null;

  const emojiStrip = trimmed.replace(EMOJI_PREFIX, '');

  const boldMatch = emojiStrip.match(/\*\*([^*]+)\*\*/);
  if (boldMatch) return normalizePlaceLabel(boldMatch[1]);

  const bulletMatch = emojiStrip.match(/^[•\-]\s*(.+?)(?:\s*→|$)/);
  if (bulletMatch) return normalizePlaceLabel(bulletMatch[1].replace(/\*\*/g, ''));

  return null;
}

const KEYCAP_EMOJIS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'] as const;

export function keycapNumberEmoji(n: number): string {
  if (n >= 1 && n <= KEYCAP_EMOJIS.length) return KEYCAP_EMOJIS[n - 1];
  return `${n}.`;
}

export function extractDayNumber(title: string): number | null {
  const t = title.trim();
  const m = t.match(/^day\s*(\d+)/i) || t.match(/^DAY(\d+)/i) || t.match(/^(\d+)일차/i);
  return m ? parseInt(m[1], 10) : null;
}

const DAY_SECTION_TITLE_RE = /^(day\s*\d+|\d+일차)/i;

export function isDaySectionTitle(title: string): boolean {
  return DAY_SECTION_TITLE_RE.test((title || '').trim());
}

/** Day1 — 소제목 → DAY1 — 소제목 */
export function formatDaySectionTitle(title: string): string {
  const t = title.trim();
  const dayMatch = t.match(/^day\s*(\d+)\s*(.*)$/i);
  if (dayMatch) {
    const rest = dayMatch[2].trim();
    const sub = rest ? (rest.startsWith('—') || rest.startsWith('-') ? ` ${rest.replace(/^[-—]\s*/, '— ')}` : ` — ${rest}`) : '';
    return `DAY${dayMatch[1]}${sub}`;
  }
  const krMatch = t.match(/^(\d+)일차\s*(.*)$/i);
  if (krMatch) {
    const rest = krMatch[2].trim();
    const sub = rest ? (rest.startsWith('—') || rest.startsWith('-') ? ` ${rest.replace(/^[-—]\s*/, '— ')}` : ` — ${rest}`) : '';
    return `DAY${krMatch[1]}${sub}`;
  }
  return t.replace(/^DAY(\d+)/i, (_, n) => `DAY${n}`);
}

/** 일정형 사진: 공항·이동수단은 제외, 관광지 우선 */
export type ItineraryPhotoTier =
  | 'skip'
  | 'attraction'
  | 'shopping'
  | 'generic'
  | 'restaurant'
  | 'hotel';

export function classifyItineraryPhotoTier(placeName: string, emoji: string): ItineraryPhotoTier {
  const name = placeName.trim();
  if (
    emoji === '🚆' ||
    emoji === '🛍️' ||
    /^공항|이동수단|환승역/i.test(name) ||
    /^(공항|이동|출국|입국|도착)\b/i.test(name) ||
    /쇼핑|마켓|백화점|아울렛|면세/i.test(name)
  ) {
    return 'skip';
  }
  if (
    emoji === '⛩️' ||
    /관광|신사|사찰|박물관|공원|USJ|스튜디오|타워|성|전망|이나리|천황|유니버설|폭포|해변|계곡|온천|폭/i.test(
      placeName
    )
  ) {
    return 'attraction';
  }
  if (emoji === '🏨' || /호텔|숙소|료칸|펜션|게스트|민박/i.test(placeName)) return 'hotel';
  if (emoji === '🍜' || /맛집|식당|라멘|카페|타코|오코노미/i.test(placeName)) return 'restaurant';
  return 'generic';
}

function tierRank(tier: ItineraryPhotoTier): number {
  switch (tier) {
    case 'attraction':
      return 0;
    case 'generic':
      return 1;
    case 'hotel':
      return 2;
    case 'restaurant':
      return 3;
    default:
      return 99;
  }
}

/** Day 섹션: 명소 → 숙소 → 맛집 순 사진. 쇼핑·이동 제외. Day당 최소 1장 */
export function computeItineraryPhotoVisibility(
  items: ContentItem[],
  places: Place[]
): Map<number, boolean> {
  const result = new Map<number, boolean>();
  const seenPlaces = new Set<string>();
  const tierOrder: ItineraryPhotoTier[] = ['attraction', 'generic', 'hotel', 'restaurant'];

  function assignPhoto(i: number, item: Extract<ContentItem, { kind: 'place' }>): boolean {
    const matched = matchPlace(item.placeName, places);
    const key = normalizePlaceLabel(item.placeName);
    const hasPhoto = (matched?.photo_urls?.length ?? 0) > 0;
    if (hasPhoto && key && !seenPlaces.has(key)) {
      result.set(i, true);
      seenPlaces.add(key);
      return true;
    }
    result.set(i, false);
    return false;
  }

  items.forEach((item, i) => {
    if (item.kind !== 'place') return;
    const tier = classifyItineraryPhotoTier(item.placeName, item.emoji);
    if (tier === 'skip' || tier === 'shopping') {
      result.set(i, false);
      return;
    }
    result.set(i, false);
  });

  for (const targetTier of tierOrder) {
    items.forEach((item, i) => {
      if (item.kind !== 'place') return;
      if (classifyItineraryPhotoTier(item.placeName, item.emoji) !== targetTier) return;
      if (result.get(i)) return;
      assignPhoto(i, item);
    });
  }

  const shownCount = [...result.values()].filter(Boolean).length;
  if (shownCount === 0) {
    const candidates = items
      .map((item, i) => ({ item, i }))
      .filter(
        (row): row is { item: Extract<ContentItem, { kind: 'place' }>; i: number } =>
          row.item.kind === 'place'
      )
      .filter(({ item }) => {
        const tier = classifyItineraryPhotoTier(item.placeName, item.emoji);
        return tier !== 'skip' && tier !== 'shopping';
      })
      .sort(
        (a, b) =>
          tierRank(classifyItineraryPhotoTier(a.item.placeName, a.item.emoji)) -
          tierRank(classifyItineraryPhotoTier(b.item.placeName, b.item.emoji))
      );

    for (const { item, i } of candidates) {
      const matched = matchPlace(item.placeName, places);
      if ((matched?.photo_urls?.length ?? 0) > 0) {
        result.set(i, true);
        break;
      }
    }
  }

  return result;
}
