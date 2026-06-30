/** reviews — ref 필드·본문 [ref:N]·sources.id 동기화, 출처 없는 후기 제외 */

import { pickPlaceReviews } from "./reviewFilter.js";

const REF_INLINE = /\[ref:(\d+)\]/;

export function extractRefFromReviewText(text) {
  const m = String(text ?? "").match(REF_INLINE);
  return m ? parseInt(m[1], 10) : undefined;
}

function inferRefFromSources(reviewText, sources) {
  const body = String(reviewText ?? "")
    .replace(/\s*(?:\[ref:\d+\])+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (body.length < 10 || !Array.isArray(sources) || sources.length === 0) {
    return undefined;
  }

  const snippet = body.slice(0, 48);
  let bestId;
  let bestLen = 0;

  for (const s of sources) {
    const preview = String(s.text_preview ?? s.title ?? "").trim();
    if (!preview || preview.length < 8) continue;

    if (preview.includes(snippet) || body.includes(preview.slice(0, 32))) {
      const len = Math.min(snippet.length, preview.length);
      if (len > bestLen) {
        bestLen = len;
        bestId = s.id;
      }
    }
  }

  return bestId;
}

export function resolveReviewRef(review, sourceIds, sources) {
  if (!review || typeof review !== "object") return undefined;

  let ref =
    review.ref != null && Number.isFinite(Number(review.ref))
      ? Number(review.ref)
      : extractRefFromReviewText(review.text);

  if (ref != null && !sourceIds.has(ref)) {
    ref = inferRefFromSources(review.text, sources);
  }

  if (ref == null || !sourceIds.has(ref)) return undefined;
  return ref;
}

export function ensureReviewRefs(data) {
  const sources = Array.isArray(data.sources) ? data.sources : [];
  const sourceIds = new Set(
    sources.map((s) => s.id).filter((id) => Number.isFinite(id))
  );

  if (sourceIds.size === 0) {
    return {
      ...data,
      sections: Array.isArray(data.sections)
        ? data.sections.map((s) => ({
            ...s,
            places_detail: (s.places_detail ?? []).map((pd) => ({
              ...pd,
              reviews: [],
            })),
            reviews: [],
          }))
        : [],
    };
  }

  const syncReview = (r) => {
    const ref = resolveReviewRef(r, sourceIds, sources);
    if (ref == null) return null;
    return { ...r, ref };
  };

  return {
    ...data,
    sections: Array.isArray(data.sections)
      ? data.sections.map((section) => ({
          ...section,
          places_detail: Array.isArray(section.places_detail)
            ? section.places_detail.map((pd) => ({
                ...pd,
                reviews: pickPlaceReviews(
                  (pd.reviews ?? []).map(syncReview).filter(Boolean),
                  { placeName: pd.name ?? "", description: pd.description ?? "" }
                ),
              }))
            : [],
          reviews: Array.isArray(section.reviews)
            ? section.reviews.map(syncReview).filter(Boolean)
            : [],
        }))
      : [],
  };
}
