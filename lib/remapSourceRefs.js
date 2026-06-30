/** 본문 [ref:N] ↔ sources.id 를 1..N 연속 번호로 통일 */

const REF_RE = /\[ref:(\d+)\]/g;

function remapText(text, oldToNew) {
  if (typeof text !== "string" || !text) return text;
  return text.replace(REF_RE, (_, num) => {
    const next = oldToNew.get(parseInt(num, 10));
    return next != null ? `[ref:${next}]` : "";
  }).replace(/\s{2,}/g, " ").trim();
}

function extractRefFromText(text) {
  const m = String(text ?? "").match(/\[ref:(\d+)\]/);
  return m ? parseInt(m[1], 10) : undefined;
}

function remapReview(review, oldToNew) {
  if (!review || typeof review !== "object") return review;
  const text = review.text ?? "";
  const inlineRef = extractRefFromText(text);
  const oldRef =
    review.ref != null && Number.isFinite(Number(review.ref))
      ? Number(review.ref)
      : inlineRef;
  const newRef = oldRef != null ? oldToNew.get(oldRef) : undefined;
  return {
    ...review,
    text: remapText(text, oldToNew),
    ref: newRef ?? undefined,
  };
}

function remapPlaceDetail(pd, oldToNew) {
  if (!pd || typeof pd !== "object") return pd;
  return {
    ...pd,
    description: remapText(pd.description ?? "", oldToNew),
    warnings: Array.isArray(pd.warnings)
      ? pd.warnings.map((w) => remapText(w, oldToNew)).filter(Boolean)
      : [],
    reviews: Array.isArray(pd.reviews)
      ? pd.reviews.map((r) => remapReview(r, oldToNew))
      : [],
  };
}

function remapSection(section, oldToNew) {
  if (!section || typeof section !== "object") return section;

  let table = section.table;
  if (table?.rows) {
    table = {
      ...table,
      rows: table.rows.map((row) =>
        Array.isArray(row) ? row.map((cell) => remapText(String(cell ?? ""), oldToNew)) : row
      ),
    };
  }

  return {
    ...section,
    content: remapText(section.content ?? "", oldToNew),
    table,
    places_detail: Array.isArray(section.places_detail)
      ? section.places_detail.map((pd) => remapPlaceDetail(pd, oldToNew))
      : [],
    reviews: Array.isArray(section.reviews)
      ? section.reviews.map((r) => remapReview(r, oldToNew))
      : [],
  };
}

/**
 * @param {import('../components/chat/types').SearchResponse} data
 */
export function remapSourceRefs(data) {
  const sources = Array.isArray(data.sources) ? data.sources : [];
  if (sources.length === 0) return data;

  const sorted = [...sources].sort((a, b) => a.id - b.id);
  const oldToNew = new Map();
  const newSources = sorted.map((s, i) => {
    const newId = i + 1;
    oldToNew.set(s.id, newId);
    return { ...s, id: newId };
  });

  return {
    ...data,
    summary: remapText(data.summary ?? "", oldToNew),
    sections: Array.isArray(data.sections)
      ? data.sections.map((s) => remapSection(s, oldToNew))
      : [],
    sources: newSources,
  };
}

/** sources에 없는 ref id — 클릭·툴팁 실패 방지용 */
export function collectKnownSourceIds(sources) {
  return new Set((sources ?? []).map((s) => s.id));
}
