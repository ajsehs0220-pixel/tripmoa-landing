import type { Source } from './types';

const GENERIC_SOURCE_TITLES = new Set([
  '',
  '네이버 카페 후기',
  '네이버 카페',
  '네이버 블로그 후기',
  '네이버 블로그',
  '네이버후기',
  '네이버 후기',
]);

export function formatSourceChannel(channel: string): string {
  if (channel?.includes('카페')) return '네이버 카페';
  if (channel?.includes('블로그')) return '네이버 블로그';
  return channel || '웹';
}

/** 카페 질문/댓글 라벨 정리 — 질문: 접두·? 이후 제거 */
export function normalizeSourceTitle(title: string | undefined | null): string {
  if (!title) return '';

  let t = title.trim().replace(/^[#*\-\d.)\s]+/, '').trim();
  const questionMatch = t.match(/^질문\s*[:：]\s*(.+)$/i);
  if (questionMatch?.[1]) {
    t = questionMatch[1].trim();
  }

  const qIndex = t.search(/[?？]/);
  if (qIndex >= 0) {
    t = t.slice(0, qIndex).trim();
  }

  return t.trim();
}

export function isGenericSourceTitle(title: string | undefined | null): boolean {
  const t = normalizeSourceTitle(title);
  if (!t || GENERIC_SOURCE_TITLES.has(t)) return true;
  if (/^댓글\s*[:：]/i.test(t)) return true;
  if (t.includes('네이버') && t.includes('후기') && t.length <= 28) return true;
  if (/[?？]$/.test(t)) return true;
  return false;
}

/** 청크 text에서 '제목: ...' 추출 (백엔드 main.py extract_title과 동일) */
export function extractTitleFromText(text: string | undefined | null): string {
  if (!text) return '';

  const normalized = text.trim().replace(/^\ufeff/, '').replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');

  for (let i = 0; i < Math.min(lines.length, 20); i++) {
    const line = lines[i].trim();
    const m = line.match(/^제목\s*[:：]\s*(.*)$/i);
    if (m) {
      const val = normalizeSourceTitle(m[1].trim());
      if (val) return val;
      for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
        const nextLine = lines[j].trim();
        if (!nextLine) continue;
        if (/^(본문|내용|작성자|날짜|출처|링크|댓글)/i.test(nextLine)) continue;
        const nextVal = normalizeSourceTitle(nextLine);
        if (nextVal) return nextVal;
      }
      return '';
    }
  }

  const bodyMatch = normalized.slice(0, 4000).match(
    /(?:^|\n)제목\s*[:：]\s*(.+?)(?:\n|$)/i
  );
  if (bodyMatch?.[1]) {
    const val = normalizeSourceTitle(bodyMatch[1].trim());
    if (val) return val;
  }

  const bracketMatch = normalized.slice(0, 800).match(/\[제목:\s*(.+?)\]/);
  if (bracketMatch?.[1]) {
    const val = normalizeSourceTitle(bracketMatch[1].trim());
    if (val) return val;
  }

  const bracketColonMatch = normalized
    .slice(0, 800)
    .match(/\[제목\s*[:：]\s*(.+?)\]/);
  if (bracketColonMatch?.[1]) {
    const val = normalizeSourceTitle(bracketColonMatch[1].trim());
    if (val) return val;
  }

  return '';
}

function titleFromTextFallback(text: string, maxLen = 56): string {
  if (!text) return '';
  const normalized = text.trim().replace(/\r\n/g, '\n');
  const skip = /^(제목|작성자|날짜|출처|링크|url|http|www\.|ref:|\[ref:|댓글)/i;

  for (const rawLine of normalized.split('\n').slice(0, 15)) {
    const bare = rawLine.trim().replace(/^[#*\-\d.)\s]+/, '').trim();
    const qm = bare.match(/^질문\s*[:：]\s*(.+)$/i);
    if (qm?.[1]) {
      const questionTitle = normalizeSourceTitle(qm[1]);
      if (questionTitle.length >= 8) {
        return questionTitle.slice(0, maxLen).trim();
      }
    }
    if (bare.length < 8 || bare.length > 100) continue;
    if (skip.test(bare)) continue;
    return normalizeSourceTitle(bare).slice(0, maxLen).trim();
  }
  return '';
}

/** API title + 청크 미리보기에서 제목 추출 */
export function displaySourceTitle(source: Source): string {
  const apiTitle = normalizeSourceTitle(source.title);
  if (!isGenericSourceTitle(apiTitle)) return apiTitle;

  const fromPreview = extractTitleFromText(source.text_preview);
  if (fromPreview && !isGenericSourceTitle(fromPreview)) return fromPreview;

  const fallback = titleFromTextFallback(source.text_preview ?? '');
  if (fallback && !isGenericSourceTitle(fallback)) return fallback;

  return '';
}

/** ref 툴팁 등 좁은 영역 */
export const SOURCE_TITLE_TOOLTIP_MAX = 52;

function truncateAtWordBoundary(title: string, maxLen: number): string {
  const trimmed = title.trim();
  if (trimmed.length <= maxLen) return trimmed;

  const window = trimmed.slice(0, maxLen + 1);
  const lastSpace = window.lastIndexOf(' ');
  const minBreak = Math.floor(maxLen * 0.55);

  if (lastSpace >= minBreak) {
    return `${trimmed.slice(0, lastSpace).trimEnd()}...`;
  }

  return `${trimmed.slice(0, maxLen).trimEnd()}...`;
}

export function truncateSourceTitle(
  title: string,
  maxLen = SOURCE_TITLE_TOOLTIP_MAX
): string {
  return truncateAtWordBoundary(title, maxLen);
}
