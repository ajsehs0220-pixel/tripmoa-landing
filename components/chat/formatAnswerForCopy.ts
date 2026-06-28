import type { SearchResponse } from './types';

function stripRefs(text: string): string {
  return text.replace(/\s*\[ref:\d+\]/g, '').replace(/\*\*/g, '').trim();
}

export function formatQueryForCopy(query: string, city?: string): string {
  const q = query.trim();
  return city ? `[${city}] ${q}` : q;
}

export function formatAnswerForCopy(result: SearchResponse): string {
  const lines: string[] = [];

  if (result.summary) {
    lines.push(stripRefs(result.summary), '');
  }

  for (const warning of result.warning ?? []) {
    lines.push(`⚠️ ${stripRefs(warning)}`);
  }
  if (result.warning?.length) lines.push('');

  for (const section of result.sections ?? []) {
    const title = section.title?.trim();
    if (title) lines.push(title);

    if (section.content) {
      for (const line of section.content.split('\n')) {
        const trimmed = stripRefs(line);
        if (trimmed) lines.push(trimmed);
      }
    }

    for (const place of section.places_detail ?? []) {
      for (const review of place.reviews ?? []) {
        const text = stripRefs(review.text);
        if (text) lines.push(`"${text}"`);
      }
    }

    if (!section.places_detail?.length) {
      for (const review of section.reviews ?? []) {
        const text = stripRefs(review.text);
        if (text) lines.push(`"${text}"`);
      }
    }

    lines.push('');
  }

  const sources = result.sources ?? [];
  if (sources.length > 0) {
    lines.push('참고 후기');
    sources.forEach((s, i) => {
      const meta = [s.channel, s.date].filter(Boolean).join(' · ');
      lines.push(`${i + 1}. ${s.title}${meta ? ` (${meta})` : ''}`);
      if (s.link) lines.push(s.link);
    });
  }

  return lines.join('\n').trim();
}

export function formatTurnForCopy(
  query: string,
  result: SearchResponse,
  city?: string
): string {
  return `질문\n${formatQueryForCopy(query, city)}\n\n답변\n${formatAnswerForCopy(result)}`;
}
