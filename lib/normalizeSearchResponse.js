// lib/normalizeSearchResponse.js
// 백엔드(main.py) SearchResponse 형식으로 통일

import { enrichPlaceWarnings } from "./inferPlaceWarnings.js";
import { pickPlaceReviews } from "./reviewFilter.js";
import { sanitizeWarnings } from "./warningSanitize.js";

function normalizeReview(r) {
  if (!r || typeof r !== "object") return null;
  const text = String(r.text ?? "").trim();
  if (!text) return null;
  const ref = r.ref != null ? toInt(r.ref) : undefined;
  return {
    text,
    sentiment: r.sentiment === "negative" ? "negative" : "positive",
    date: r.date ?? undefined,
    ref: ref ?? undefined,
  };
}

function normalizePlaceDetail(pd) {
  if (!pd || typeof pd !== "object") return null;
  const reviews = pickPlaceReviews(
    Array.isArray(pd.reviews) ? pd.reviews.map(normalizeReview).filter(Boolean) : [],
    { placeName: pd.name ?? "", description: pd.description ?? "" }
  );
  return {
    name: pd.name ?? "",
    description: pd.description ?? "",
    reviews,
    warnings: sanitizeWarnings(
      Array.isArray(pd.warnings) ? pd.warnings.filter((w) => typeof w === "string" && w.trim()) : []
    ),
  };
}

/** 구 스키마 root warning[] → places_detail.warnings 로 이전 */
function migrateRootWarnings(sections, rootWarnings) {
  if (!Array.isArray(rootWarnings) || rootWarnings.length === 0) {
    return sections;
  }

  const hasPlaceWarnings = sections.some((s) =>
    (s.places_detail ?? []).some((pd) => pd.warnings?.length)
  );
  if (hasPlaceWarnings) return sections;

  const allDetails = sections.flatMap((s) => s.places_detail ?? []);
  if (allDetails.length === 0) return sections;

  const updated = sections.map((s) => ({
    ...s,
    places_detail: (s.places_detail ?? []).map((pd) => ({
      ...pd,
      warnings: [...(pd.warnings ?? [])],
    })),
  }));

  const flatDetails = updated.flatMap((s) => s.places_detail ?? []);

  for (const warning of rootWarnings) {
    if (typeof warning !== "string" || !warning.trim()) continue;

    const matched =
      flatDetails.find((pd) => {
        if (!pd.name) return false;
        const name = pd.name.trim();
        if (warning.includes(name)) return true;
        return name
          .split(/\s+/)
          .some((tok) => tok.length >= 2 && warning.includes(tok));
      }) ?? flatDetails[0];

    matched.warnings.push(warning.trim());
  }

  return updated;
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
    text_preview: typeof s.text_preview === "string" ? s.text_preview : "",
    is_ad: Boolean(s.is_ad),
  };
}

function normalizeFollowUp(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((q) => (typeof q === "string" ? q.trim() : ""))
    .filter(Boolean)
    .slice(0, 5);
}

function normalizeYoutubeVideo(v) {
  if (!v || typeof v !== "object") return null;
  const url = v.url ?? "";
  if (!url) return null;
  return {
    title: (v.title ?? "").trim(),
    url,
  };
}

const EMPTY = {
  summary: "",
  sections: [],
  warning: [],
  places: null,
  follow_up: [],
  sources: [],
  youtube_videos: [],
  map_title: "",
};

function stripSummaryRefs(text) {
  if (typeof text !== "string") return "";
  return text.replace(/\s*\[ref:\d+\]/g, "").replace(/\*\*/g, "").trim();
}

export function normalizeSearchResponse(raw) {
  if (!raw || typeof raw !== "object") return { ...EMPTY };

  const placesRaw = raw.places;
  let places = null;
  if (Array.isArray(placesRaw)) {
    const normalized = placesRaw.map(normalizePlace).filter(Boolean);
    places = normalized.length > 0 ? normalized : null;
  }

  const rootWarnings = Array.isArray(raw.warning) ? raw.warning : [];
  const sections = enrichPlaceWarnings(
    migrateRootWarnings(
      Array.isArray(raw.sections)
        ? raw.sections.map(normalizeSection).filter(Boolean)
        : [],
      rootWarnings
    )
  );

  return {
    summary: stripSummaryRefs(raw.summary ?? ""),
    sections,
    warning: [],
    places,
    follow_up: normalizeFollowUp(raw.follow_up),
    sources: Array.isArray(raw.sources)
      ? raw.sources.map(normalizeSource).filter(Boolean)
      : [],
    youtube_videos: Array.isArray(raw.youtube_videos)
      ? raw.youtube_videos.map(normalizeYoutubeVideo).filter(Boolean)
      : [],
    map_title: typeof raw.map_title === "string" ? raw.map_title.trim() : "",
  };
}
