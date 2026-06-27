// lib/searchClient.js
// ===========================================================================
// Mock / 실제 API 분기용 단일 진입점
// NEXT_PUBLIC_USE_MOCK=true  → 가짜 데이터 (로컬 개발, 0원)
// NEXT_PUBLIC_USE_MOCK=false → 실제 Railway API 호출 (Vercel 배포)
//
// ⚠️ 2026-06-25 스키마 변경: 백엔드(schema.py) 응답 구조가
//    {answer, sources} → {summary, sections[], warning[], places[], follow_up[], sources[]}
//    로 바뀌어서 Mock도 동일한 형태로 다시 작성함.
// ===========================================================================

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// TODO: 실제 Railway 백엔드 주소로 교체되어 있는지 확인하세요
const API_URL = "https://eeesytripmoa-project-production.up.railway.app/search";

// ---------------------------------------------------------------------------
// 숙소 검색 여부 판별 (검색어에 숙소 관련 키워드 있으면 지도용 Mock 반환)
// ---------------------------------------------------------------------------
function isLodgingQuery(query = "") {
  const keywords = ["호텔", "숙소", "숙박", "게스트하우스", "에어비앤비", "료칸"];
  return keywords.some((kw) => query.includes(kw));
}

// ===========================================================================
// Mock 데이터 1: 일정 질문 응답 (schema.py 출력 형식 그대로)
// ===========================================================================
const MOCK_ITINERARY = {
  summary: "오사카 3박4일 연인 여행은 도톤보리·USJ·교토 당일치기 코스가 가장 추천돼요.",
  sections: [
    {
      icon: "🗺️",
      title: "1일차 — 도착 & 도톤보리",
      content:
        "공항 도착 후 난바 숙소에 짐을 풀고, 저녁엔 **도톤보리** 일대에서 타코야키와 오코노미야키를 즐기는 코스가 가장 많이 추천돼요 [ref:1][ref:2].",
      table: null,
      reviews: [
        { text: "도톤보리는 밤에 가야 분위기가 진짜 좋아요. 타코야키 줄 서는 것도 여행의 재미!", sentiment: "positive", date: "26.03", ref: 1 },
        { text: "주말 저녁엔 사람이 너무 많아서 걸어 다니기 힘들었어요.", sentiment: "negative", date: "26.02", ref: 2 },
      ],
    },
    {
      icon: "🗺️",
      title: "2일차 — 유니버설 스튜디오",
      content:
        "연인 여행이면 **유니버설 스튜디오 재팬**을 하루 통째로 비우는 걸 추천하는 후기가 많았어요. 닌텐도 월드는 별도 입장권(타이밍 티켓)이 필요하니 아침 일찍 입장하는 게 좋아요 [ref:1].",
      table: null,
      reviews: [
        { text: "USJ는 하루 종일 있어도 모자라요. 닌텐도 월드 꼭 가세요!", sentiment: "positive", date: "26.03", ref: 1 },
      ],
    },
    {
      icon: "⛩️",
      title: "3일차 — 교토 데이트 코스",
      content:
        "당일치기로 교토 다녀오는 일정도 인기가 많아요. 후시미이나리 신사 → 기온거리 → 가모가와 강변 산책 코스가 사진 찍기 좋다는 의견이 다수였어요 [ref:1].",
      table: null,
    },
    {
      icon: "🛍️",
      title: "4일차 — 쇼핑 & 출국",
      content:
        "신사이바시·우메다에서 마지막 쇼핑 후 공항으로 이동하는 게 일반적인 마무리 코스예요 [ref:2].",
      table: null,
    },
  ],
  warning: ["닌텐도 월드는 타이밍 티켓 사전 예약이 필요해요. 현장에서는 입장이 제한될 수 있어요."],
  places: [
    { day: 1, name: "도톤보리", lat: 34.6687, lng: 135.5013, photo_urls: ["https://placehold.co/400x300?text=Dotonbori"], description: "타코야키·오코노미야키 맛집 거리" },
    { day: 2, name: "유니버설 스튜디오 재팬", lat: 34.6654, lng: 135.4323, photo_urls: ["https://placehold.co/400x300?text=USJ"], description: "닌텐도 월드 별도 입장권 필요" },
    { day: 3, name: "후시미이나리 신사", lat: 34.9671, lng: 135.7727, photo_urls: ["https://placehold.co/400x300?text=Fushimi+Inari"], description: "사진 명소로 인기" },
  ],
  follow_up: ["USJ 입장권은 어디서 사야 해요?", "교토 당일치기 기차 시간표 알려줘"],
  sources: [
    { id: 1, title: "오사카 3박4일 연인 일정 풀코스 후기 (USJ+교토)", channel: "네이버 카페", date: "26.03", link: "https://cafe.naver.com/jpnstory/22210001" },
    { id: 2, title: "오사카 도톤보리 맛집 + 동선 정리", channel: "네이버 블로그", date: "26.02", link: "https://cafe.naver.com/jpnstory/22210045" },
  ],
};

// ===========================================================================
// Mock 데이터 2: 숙소 질문 응답 (schema.py 출력 형식 그대로)
// ===========================================================================
const MOCK_LODGING = {
  summary: "오사카 가성비 호텔은 위치별로 난바·우메다·신사이바시가 각각 다른 매력이 있어요.",
  sections: [
    {
      icon: "🏨",
      title: "추천 숙소",
      content:
        "오사카에서 가성비 좋은 호텔로는 난바, 우메다, 신사이바시 지역 호텔이 많이 언급돼요 [ref:1][ref:2].",
      table: {
        headers: ["지역", "특징"],
        rows: [
          ["난바", "도톤보리 도보권, 공항(난카이선) 직결이라 짐 들고 이동 편해요 [ref:1]."],
          ["우메다", "백화점·교통 허브. 깔끔한 비즈니스호텔이 많고 쇼핑 동선이 좋아요 [ref:2]."],
          ["신사이바시", "쇼핑 중심. 밤늦게 다녀도 안전하다는 후기가 다수예요 [ref:1]."],
        ],
      },
      reviews: [
        { text: "난바 잡으면 공항에서 바로 갈 수 있어서 짐 들고 이동하기 편했어요.", sentiment: "positive", date: "26.04", ref: 1 },
        { text: "우메다는 밤에 조용해서 혼자 걸어다니기 좋았어요.", sentiment: "positive", date: "26.01", ref: 2 },
        { text: "신사이바시는 쇼핑은 좋은데 숙소가 좀 시끄러울 수 있어요.", sentiment: "negative", date: "26.04", ref: 1 },
      ],
    },
  ],
  warning: [],
  places: [
    { day: null, name: "난바 일대", lat: 34.6659, lng: 135.5009, photo_urls: ["https://placehold.co/400x300?text=Namba"], description: "도톤보리 도보권, 공항 직결" },
    { day: null, name: "우메다 일대", lat: 34.7055, lng: 135.4983, photo_urls: ["https://placehold.co/400x300?text=Umeda"], description: "교통 허브, 비즈니스호텔 밀집" },
    { day: null, name: "신사이바시 일대", lat: 34.6724, lng: 135.5007, photo_urls: ["https://placehold.co/400x300?text=Shinsaibashi"], description: "쇼핑 중심, 야간 안전" },
  ],
  follow_up: ["오사카에서 공항까지 가는 법 알려줘", "신사이바시 근처 맛집도 추천해줘"],
  sources: [
    { id: 1, title: "오사카 숙소 위치 고민이면 그냥 난바 잡으세요 (이유 정리)", channel: "네이버 카페", date: "26.04", link: "https://cafe.naver.com/jpnstory/22223333" },
    { id: 2, title: "[숙박후기] 오사카 가성비 호텔 3곳 직접 묵어본 비교", channel: "네이버 블로그", date: "26.01", link: "https://blog.naver.com/hotel_review/224567890" },
  ],
};

// ===========================================================================
// 단일 진입점
// ===========================================================================
export async function search(params) {
  const { query = "" } = params;

  // ---- Mock 모드 ----
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 600)); // 실제 로딩 느낌
    return isLodgingQuery(query) ? MOCK_LODGING : MOCK_ITINERARY;
  }

  // ---- 실제 API 모드 ----
  // 빈 값은 빼고 보냄 (빈필터 버그 회피)
  const body = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== "" && v != null)
  );

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`search failed: ${res.status}`);
  return res.json();
}