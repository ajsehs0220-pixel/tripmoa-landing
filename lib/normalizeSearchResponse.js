// lib/normalizeSearchResponse.js
// 백엔드(main.py) SearchResponse 형식으로 통일

function normalizeReview(r) {
  if (!r || typeof r !== "object") return null;
  const ref = r.ref != null ? toInt(r.ref) : undefined;
  return {
    text: r.text ?? "",
    sentiment: r.sentiment === "negative" ? "negative" : "positive",
    date: r.date ?? undefined,
    ref: ref ?? undefined,
  };
}

function normalizePlaceDetail(pd) {
  if (!pd || typeof pd !== "object") return null;
  return {
    name: pd.name ?? "",
    description: pd.description ?? "",
    reviews: Array.isArray(pd.reviews)
      ? pd.reviews.map(normalizeReview).filter(Boolean)
      : [],
  };
}

function normalizeSection(s) {
  if (!s || typeof s !== "object") return null;
  const table =
    s.table &&
    Array.isArray(s.table.headers) &&
    Array.isArray(s.table.rows)
      ? { headers: s.table.headers, rows: s.table.rows }
      : null;

  const places_detail = Array.isArray(s.places_detail)
    ? s.places_detail.map(normalizePlaceDetail).filter(Boolean)
    : [];

  return {
    icon: s.icon ?? "",
    title: s.title ?? "",
    content: s.content ?? "",
    places_detail,
    reviews: Array.isArray(s.reviews)
      ? s.reviews.map(normalizeReview).filter(Boolean)
      : [],
    table,
  };
}

function normalizePlace(p) {
  if (!p || typeof p !== "object") return null;

  let photo_urls = [];
  if (Array.isArray(p.photo_urls)) {
    photo_urls = p.photo_urls.filter(Boolean);
  } else if (p.photo_url) {
    photo_urls = [p.photo_url];
  }

  return {
    day: p.day ?? null,
    name: p.name ?? "",
    lat: typeof p.lat === "number" ? p.lat : 0,
    lng: typeof p.lng === "number" ? p.lng : 0,
    photo_urls,
    rating: typeof p.rating === "number" ? p.rating : null,
    description: p.description ?? "",
  };
}

function toInt(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const n = parseInt(String(value), 10);
  return Number.isFinite(n) ? n : null;
}

function normalizeSource(s) {
  if (!s || typeof s !== "object") return null;
  const id = toInt(s.id);
  if (id == null) return null;
  return {
    id,
    title: s.title ?? "",
    channel: s.channel ?? "",
    date: s.date ?? "",
    link: s.link ?? "",
  };
}

function normalizeFollowUp(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((q) => (typeof q === "string" ? q.trim() : ""))
    .filter(Boolean)
    .slice(0, 5);
}

const EMPTY = {
  summary: "",
  sections: [],
  warning: [],
  places: null,
  follow_up: [],
  sources: [],
};

export function normalizeSearchResponse(raw) {
  if (!raw || typeof raw !== "object") return { ...EMPTY };

  const placesRaw = raw.places;
  let places = null;
  if (Array.isArray(placesRaw)) {
    const normalized = placesRaw.map(normalizePlace).filter(Boolean);
    places = normalized.length > 0 ? normalized : null;
  }

  return {
    summary: raw.summary ?? "",
    sections: Array.isArray(raw.sections)
      ? raw.sections.map(normalizeSection).filter(Boolean)
      : [],
    warning: Array.isArray(raw.warning) ? raw.warning : [],
    places,
    follow_up: normalizeFollowUp(raw.follow_up),
    sources: Array.isArray(raw.sources)
      ? raw.sources.map(normalizeSource).filter(Boolean)
      : [],
  };
}
