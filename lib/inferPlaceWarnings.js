/**
 * 부정 후기에서 장소별 warning 추론 (API/LLM 누락 시 보완)
 */

import { isValidReviewText, pickPlaceReviews } from "./reviewFilter.js";
import { sanitizeWarnings, warningClauseFromReview } from "./warningSanitize.js";

const CAUTION_RULES = [
  { re: /타이밍\s*티켓|사전\s*예약|예약\s*필수|예약\s*해야|예약\s*없/, label: "사전예약 필수" },
  { re: /막차|마지막\s*열차|라스트\s*오더/i, label: "막차·마감 확인" },
  { re: /휴무|정기\s*휴|쉬는\s*날/, label: "휴무일 확인" },
  { re: /월요일|화요일|수요일|목요일|금요일|토요일|일요일/, label: "요일별 휴무 확인" },
  { re: /현금\s*만|현금\s*only/i, label: "현금만 가능" },
  { re: /입장\s*(제한|불가)|못\s*들어|입장\s*불/, label: "입장 제한 있음" },
  { re: /티켓|입장권|패스/, label: "티켓 사전확인" },
  { re: /줄\s|대기|웨이팅|기다/, label: "대기 시간 길어요" },
  { re: /좁|빡빡|캐리어/, label: "공간·수납 주의" },
  { re: /일찍|아침\s*일찍|오픈\s*런/, label: "오픈런·이른 방문" },
  { re: /불친절|불쾌|무뚝뚝|직원.*별로/, label: "직원 서비스 아쉬움" },
  { re: /끈적|눅눅|위생|더럽|지저분/, label: "위생 주의" },
  { re: /맵|짜|달|느끼|비려/, label: "맛 호불호 있음" },
  { re: /비싸|가성비.*별로|가격.*아깝/, label: "가격 대비 아쉬움" },
  { re: /시끄|복잡|사람.*많|붐비/, label: "혼잡할 수 있음" },
  { re: /교통|이동|주차|운전|운행|셔틀|shuttle/i, label: "교통·이동 주의" },
  { re: /계단|경사|힘들|체력|몸\s*아/, label: "신체 부담 주의" },
];

function inlineRefSuffix(text) {
  const m = String(text).match(/(\s*(?:\[ref:\d+\])+)\s*$/);
  return m ? m[1] : "";
}

function refSuffixForReview(review, text) {
  if (review.ref != null) return ` [ref:${review.ref}]`;
  return inlineRefSuffix(text);
}

/**
 * @param {Array<{text?: string, sentiment?: string, ref?: number}>} reviews
 * @returns {string[]}
 */
export function inferWarningsFromReviews(reviews) {
  if (!Array.isArray(reviews) || reviews.length === 0) return [];

  const out = [];
  const seen = new Set();

  for (const review of reviews) {
    if (review.sentiment !== "negative") continue;
    if (!isValidReviewText(review.text)) continue;

    const text = review.text ?? "";
    const refSuffix = refSuffixForReview(review, text);
    let matched = false;

    for (const { re, label } of CAUTION_RULES) {
      if (re.test(text)) {
        const w = `${label}${refSuffix}`;
        if (!seen.has(w)) {
          seen.add(w);
          out.push(w);
        }
        matched = true;
        break;
      }
    }

    if (!matched) {
      const clause = warningClauseFromReview(text);
      if (clause) {
        const w = `${clause}${refSuffix}`;
        if (!seen.has(w)) {
          seen.add(w);
          out.push(w);
        }
      }
    }

    if (out.length >= 2) break;
  }

  return out.slice(0, 2);
}

/**
 * @param {any[]} sections
 * @returns {any[]}
 */
export function enrichPlaceWarnings(sections) {
  if (!Array.isArray(sections)) return sections;

  return sections.map((section) => ({
    ...section,
    places_detail: (section.places_detail ?? []).map((pd) => {
      const reviews = pickPlaceReviews(pd.reviews ?? [], {
        placeName: pd.name ?? "",
        description: pd.description ?? "",
      });
      let warnings = sanitizeWarnings(pd.warnings ?? []);
      if (!warnings.length && reviews.length) {
        warnings = inferWarningsFromReviews(reviews);
      }
      return { ...pd, reviews, warnings };
    }),
  }));
}
