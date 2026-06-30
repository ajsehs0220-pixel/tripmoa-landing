// lib/searchClient.js
// ===========================================================================
// Mock / 실제 API 분기용 단일 진입점
// NEXT_PUBLIC_USE_MOCK=true  → 가짜 데이터 (로컬 개발, 0원)
// NEXT_PUBLIC_USE_MOCK=false → 실제 Railway API 호출 (Vercel 배포)
// ===========================================================================

import { normalizeSearchResponse } from "./normalizeSearchResponse.js";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

const API_URL = "https://eeesytripmoa-project-production.up.railway.app/search";

function isLodgingQuery(query = "") {
  const keywords = ["호텔", "숙소", "숙박", "게스트하우스", "에어비앤비", "료칸"];
  return keywords.some((kw) => query.includes(kw));
}

function isItineraryQuery(query = "") {
  return /일정|코스|동선|루트|여행\s*계획|당일치기|하루\s*코스|\d+\s*박\s*\d+\s*일|\d+박\d+일|\d+일\s*여행/i.test(
    query
  );
}

// ===========================================================================
// Mock 데이터 1: 일정 질문 응답 (main.py SearchResponse 형식)
// ===========================================================================
const MOCK_ITINERARY = {
  summary: "오사카 3박4일 연인 여행은 도톤보리·USJ·교토 당일치기 코스가 가장 추천돼요.",
  map_title: "오사카 3박4일",
  sections: [
    {
      icon: "🗺️",
      title: "Day1 — 도착 & 도톤보리",
      content:
        "🍜 **도톤보리**\n타코야키·오코노미야키 거리, 도보 10분 [ref:1][ref:2]",
      places_detail: [
        {
          name: "도톤보리",
          description: "타코야키·오코노미야키, 밤에 분위기 좋음 [ref:1][ref:2]",
          warnings: ["줄 서는 맛집 많음 [ref:2]"],
          reviews: [
            {
              text: "도톤보리는 밤에 가야 분위기가 제일 좋아요. 타코야키 줄 서는 게 일상이에요.",
              sentiment: "positive",
              date: "26.03",
              ref: 1,
            },
          ],
        },
      ],
      table: null,
    },
    {
      icon: "🗺️",
      title: "Day2 — 유니버설 스튜디오",
      content:
        "⛩️ **유니버설 스튜디오 재팬**\n개장 직후 입장·닌텐도 월드 타이밍 티켓, 지하철 30분 [ref:1]",
      places_detail: [
        {
          name: "유니버설 스튜디오 재팬",
          description: "하루 통째로, 닌텐도 월드 별도 입장권 [ref:1]",
          warnings: ["타이밍 티켓 사전예약 [ref:1]"],
          reviews: [
            {
              text: "닌텐도 월드는 타이밍 티켓 없으면 못 들어가요. 아침 일찍 가세요.",
              sentiment: "negative",
              date: "26.03",
              ref: 1,
            },
            {
              text: "연인 여행이면 USJ를 하루 통째로 비우는 걸 추천하는 후기가 많았어요.",
              sentiment: "positive",
              date: "26.03",
              ref: 1,
            },
          ],
        },
      ],
      table: null,
    },
    {
      icon: "🗺️",
      title: "Day3 — 교토 당일치기",
      content:
        "⛩️ **후시미이나리 신사**\nJR 교토역 환승·기차 30분, 사진 명소 [ref:1]",
      places_detail: [
        {
          name: "후시미이나리 신사",
          description: "당일치기 교토 코스 인기, 사진 명소 [ref:1]",
          warnings: [],
          reviews: [
            {
              text: "당일치기로 교토 다녀오는 일정도 인기가 많아요.",
              sentiment: "positive",
              date: "26.03",
              ref: 1,
            },
          ],
        },
      ],
      table: null,
    },
    {
      icon: "🗺️",
      title: "Day4 — 쇼핑 & 출국",
      content:
        "🛍️ **신사이바시**\n마지막 쇼핑, 난바역 도보 10분 [ref:2]\n\n🚆 공항 이동\n난카이선 직통, 약 50분 [ref:2]",
      places_detail: [
        {
          name: "신사이바시",
          description: "쇼핑·마무리 동선, 난바 접근 [ref:2]",
          warnings: [],
          reviews: [
            {
              text: "신사이바시·우메다에서 마지막 쇼핑 후 공항으로 이동하는 게 일반적인 마무리 코스예요.",
              sentiment: "positive",
              date: "26.02",
              ref: 2,
            },
          ],
        },
      ],
      table: null,
    },
    {
      icon: "🏨",
      title: "숙소 추천",
      content:
        "🏨 **난바 오리엔탈 호텔**\n- 난바역 도보 5분이라 첫날·마지막날 동선이 편해요 [ref:1]\n- 난카이선 직결이라 공항 이동도 부담 없어요 [ref:1]",
      places_detail: [
        {
          name: "난바 오리엔탈 호텔",
          description: "난바역 도보 5분, 난카이선 직결 숙소 [ref:1]",
          warnings: ["체크인 시간 확인 [ref:1]"],
          reviews: [
            {
              text: "난바역에서 호텔까지 짐 끌고 5분이면 돼서 첫날·마지막날 최고였어요.",
              sentiment: "positive",
              date: "26.03",
              ref: 1,
            },
          ],
        },
      ],
      table: null,
    },
    {
      icon: "💡",
      title: "💡 여행 팁",
      content:
        "✔ 교통은 난바·우메다 환승이 편해 JR·지하철 패스 검토 [ref:1]\n✔ USJ는 닌텐도 월드 타이밍 티켓 사전 예약 필수 [ref:1]\n✔ 도톤보리는 저녁에 가면 분위기 최고 [ref:2]\n👉 한 줄 결론: 3박4일은 난바 숙소+USJ·교토 당일치기 조합이 무난",
      places_detail: [],
      table: null,
    },
  ],
  warning: [],
  places: [
    {
      day: 1,
      name: "난바 오리엔탈 호텔",
      lat: 34.6654,
      lng: 135.5013,
      photo_urls: ["https://placehold.co/400x300?text=Namba+Hotel"],
      rating: 4.3,
      description: "난바역 도보 5분",
    },
    {
      day: 1,
      name: "도톤보리",
      lat: 34.6687,
      lng: 135.5013,
      photo_urls: ["https://placehold.co/400x300?text=Dotonbori"],
      rating: 4.5,
      description: "타코야키·오코노미야키 맛집 거리",
    },
    {
      day: 2,
      name: "유니버설 스튜디오 재팬",
      lat: 34.6654,
      lng: 135.4323,
      photo_urls: ["https://placehold.co/400x300?text=USJ"],
      rating: 4.7,
      description: "닌텐도 월드 별도 입장권 필요",
    },
    {
      day: 3,
      name: "후시미이나리 신사",
      lat: 34.9671,
      lng: 135.7727,
      photo_urls: ["https://placehold.co/400x300?text=Fushimi+Inari"],
      rating: 4.6,
      description: "사진 명소로 인기",
    },
    {
      day: 4,
      name: "신사이바시",
      lat: 34.6724,
      lng: 135.5007,
      photo_urls: ["https://placehold.co/400x300?text=Shinsaibashi"],
      rating: 4.2,
      description: "마지막 쇼핑 동선",
    },
  ],
  follow_up: [
    "오사카 USJ 입장권은 어디서 사야 해요?",
    "오사카 교토 당일치기 기차 시간표 알려줘",
    "오사카 도톤보리 근처 맛집 추천해 주세요",
    "오사카 3박4일 연인 여행 예산은 얼마나 잡아야 해요?",
    "오사카 여행 패스 구매 팁 알려줘",
  ],
  sources: [
    { id: 1, title: "오사카 3박4일 연인 일정 풀코스 후기 (USJ+교토)", channel: "네이버 카페", date: "26.03", link: "https://cafe.naver.com/jpnstory/22210001" },
    { id: 2, title: "오사카 도톤보리 맛집 + 동선 정리", channel: "네이버 블로그", date: "26.02", link: "https://cafe.naver.com/jpnstory/22210045" },
  ],
  youtube_videos: [
    {
      title: "오사카 3박4일 여행 코스 | USJ·도톤보리·교토",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ],
};

// ===========================================================================
// Mock 데이터 2: 숙소 추천형 응답 (main.py 추천형 섹션 형식)
// ===========================================================================
const MOCK_LODGING = {
  summary: "오사카 가성비 호텔은 위치별로 난바·우메다·신사이바시가 각각 다른 매력이 있어요.",
  map_title: "오사카 숙소",
  sections: [
    {
      icon: "",
      title: "1️⃣ 위치+편의성 최강 (도톤보리·공항 이동 편한 곳)",
      content:
        "🏨 **난바 오리엔탈 호텔**\n- 도톤보리 도보 5분이라 첫날·마지막날 동선이 편해요 [ref:1]\n- 난카이선 직결이라 공항 이동도 부담 없어요 [ref:1]\n\n🏨 **호텔 그라시아 오사카 난바**\n- 신사이바시·난바 더블 접근이라 쇼핑 후 귀가가 쉬워요 [ref:2]\n- 가격 대비 위치가 좋아 가성비 숙소로 인기예요 [ref:2]",
      places_detail: [
        {
          name: "난바 오리엔탈 호텔",
          description: "도톤보리 도보 5분, 난카이선 직결 [ref:1]",
          reviews: [
            {
              text: "난바역에서 호텔까지 짐 끌고 5분이면 돼서 첫날·마지막날 최고였어요.",
              sentiment: "positive",
              date: "26.04",
              ref: 1,
            },
          ],
        },
        {
          name: "호텔 그라시아 오사카 난바",
          description: "신사이바시·난바 더블 접근 [ref:2]",
          reviews: [
            {
              text: "방은 좀 좁은 편이에요. 캐리어 펼치기엔 빡빡해요.",
              sentiment: "negative",
              date: "26.01",
              ref: 2,
            },
          ],
        },
      ],
      table: null,
    },
    {
      icon: "",
      title: "2️⃣ 가성비+역세권 (잠만 자면 이거)",
      content:
        "🏨 **우메다 호텔**\n- JR·지하철 허브라 어디든 이동하기 편해요 [ref:2]\n- 비즈니스호텔 가격대라 잠만 자기엔 딱이에요 [ref:2]\n\n🏨 **신사이바시 프린스 호텔**\n- 쇼핑 후 귀가 동선이 짧아 피곤할 때 좋아요 [ref:1]\n- 신사이바시 중심이라 밤 늦게까지 돌아다니기 편해요 [ref:1]",
      places_detail: [
        {
          name: "우메다 호텔",
          description: "JR·지하철 허브, 비즈니스호텔 가격대 [ref:2]",
          reviews: [
            {
              text: "우메다는 교통 허브라 어디든 가기 편했어요. 호텔 가격도 합리적.",
              sentiment: "positive",
              date: "26.01",
              ref: 2,
            },
          ],
        },
        {
          name: "신사이바시 프린스 호텔",
          description: "쇼핑 후 귀가 동선 짧음 [ref:1]",
          reviews: [],
        },
      ],
      table: null,
    },
    {
      icon: "",
      title: "💡 상황별추천",
      content:
        "✔ 첫 오사카/편하게 → **난바 오리엔탈 호텔**\n✔ 가성비+교통 → **우메다 호텔**\n👉 한 줄 결론: 공항·도톤보리 동선이면 난바, 쇼핑 위주면 신사이바시",
      places_detail: [],
      table: null,
    },
  ],
  warning: [],
  places: [
    {
      day: null,
      name: "난바 오리엔탈 호텔",
      lat: 34.6659,
      lng: 135.5009,
      photo_urls: [
        "https://placehold.co/400x300?text=Namba+1",
        "https://placehold.co/400x300?text=Namba+2",
      ],
      rating: 4.2,
      description: "",
    },
    {
      day: null,
      name: "호텔 그라시아 오사카 난바",
      lat: 34.6645,
      lng: 135.5015,
      photo_urls: ["https://placehold.co/400x300?text=Monterey"],
      rating: 4.4,
      description: "",
    },
    {
      day: null,
      name: "우메다 호텔",
      lat: 34.7055,
      lng: 135.4983,
      photo_urls: ["https://placehold.co/400x300?text=Umeda"],
      rating: 4.0,
      description: "",
    },
    {
      day: null,
      name: "신사이바시 프린스 호텔",
      lat: 34.6724,
      lng: 135.5007,
      photo_urls: ["https://placehold.co/400x300?text=Shinsaibashi"],
      rating: 4.1,
      description: "",
    },
  ],
  follow_up: [
    "오사카에서 공항까지 가는 법 알려줘",
    "신사이바시 근처 맛집 추천해 주세요",
    "난바 숙소 체크인 전 짐 맡기기 가능해요?",
    "오사카 혼자 여행 호텔 안전한 지역 알려줘",
    "오사카 숙소 조식 포함이면 꼭 먹을 만해요?",
  ],
  sources: [
    { id: 1, title: "오사카 숙소 위치 고민이면 그냥 난바 잡으세요 (이유 정리)", channel: "네이버 카페", date: "26.04", link: "https://cafe.naver.com/jpnstory/22223333" },
    { id: 2, title: "[숙박후기] 오사카 가성비 호텔 3곳 직접 묵어본 비교", channel: "네이버 블로그", date: "26.01", link: "https://blog.naver.com/hotel_review/224567890" },
  ],
  youtube_videos: [
    {
      title: "오사카 숙소 추천 | 난바·우메다 호텔 비교",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ],
};

export async function search(params) {
  const { query = "", signal, ...rest } = params;

  if (USE_MOCK) {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, 600);
      if (!signal) return;
      if (signal.aborted) {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
        return;
      }
      signal.addEventListener(
        "abort",
        () => {
          clearTimeout(timer);
          reject(new DOMException("Aborted", "AbortError"));
        },
        { once: true }
      );
    });
    const raw =
      isLodgingQuery(query) && !isItineraryQuery(query)
        ? MOCK_LODGING
        : MOCK_ITINERARY;
    return normalizeSearchResponse(raw);
  }

  const body = Object.fromEntries(
    Object.entries(rest).filter(([, v]) => v !== "" && v != null)
  );
  body.query = query;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `search failed: ${res.status}${detail ? ` — ${detail.slice(0, 200)}` : ""}`
    );
  }
  const raw = await res.json();
  return normalizeSearchResponse(raw);
}
