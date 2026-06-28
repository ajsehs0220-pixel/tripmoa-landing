import type { Place, PlaceDetail } from './types';

/** places_detail.name ↔ content **장소명** 매칭 */
export function findPlaceDetail(
  label: string,
  details: PlaceDetail[] | undefined
): PlaceDetail | undefined {
  if (!details?.length) return undefined;
  const name = normalizePlaceLabel(label);
  if (!name) return undefined;

  return details.find((p) => {
    const pn = normalizePlaceLabel(p.name);
    return pn === name || pn.includes(name) || name.includes(pn);
  });
}

/** 백엔드 places.name / content **장소명** 비교용 정규화 */
export function normalizePlaceLabel(label: string): string {
  return label
    .trim()
    .replace(/^\d+\.\s*/, '')
    .replace(/\s+/g, ' ');
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

  const boldMatch = trimmed.match(/\*\*([^*]+)\*\*/);
  if (boldMatch) return normalizePlaceLabel(boldMatch[1]);

  const bulletMatch = trimmed.match(/^[•\-]\s*(.+?)(?:\s*→|$)/);
  if (bulletMatch) return normalizePlaceLabel(bulletMatch[1].replace(/\*\*/g, ''));

  return null;
}
