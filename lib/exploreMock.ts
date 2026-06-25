// lib/exploreMock.ts
// Mock data for explore (맞춤 여행 설계) result screen.
// Mirrors the shape of MOCK_ITINERARY / MOCK_LODGING in searchClient.js.

export type ExploreCard = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
};

export type ExploreResult = {
  itinerary: ExploreCard[];
  lodging: ExploreCard[];
  snsSpots: ExploreCard[];
  restaurants: ExploreCard[];
};

// ── 오사카 ──────────────────────────────────────────────────
const OSAKA: ExploreResult = {
  itinerary: [
    { id: 'o-i1', title: '오사카 3박4일 황금 코스', subtitle: '도톤보리 → USJ → 교토 당일치기', image: 'https://placehold.co/300x200/28c5f0/ffffff?text=Osaka+Plan', tag: '추천일정' },
    { id: 'o-i2', title: '혼자 오사카 4일', subtitle: '느긋하게 동네 카페 투어', image: 'https://placehold.co/300x200/005f80/ffffff?text=Solo+Osaka', tag: '추천일정' },
    { id: 'o-i3', title: '연인과 오사카 2박3일', subtitle: 'USJ + 나라 사슴공원', image: 'https://placehold.co/300x200/6f86f5/ffffff?text=Couple+Osaka', tag: '추천일정' },
  ],
  lodging: [
    { id: 'o-l1', title: '난바 더블트리 힐튼', subtitle: '도톤보리 도보 5분', image: 'https://placehold.co/300x200/28c5f0/ffffff?text=Hilton+Namba', tag: '숙소' },
    { id: 'o-l2', title: '우메다 크로스호텔', subtitle: '교통 허브 직결', image: 'https://placehold.co/300x200/005f80/ffffff?text=Cross+Hotel', tag: '숙소' },
    { id: 'o-l3', title: '신사이바시 게스트하우스', subtitle: '쇼핑 1분, 가성비 최고', image: 'https://placehold.co/300x200/6f86f5/ffffff?text=Guesthouse', tag: '숙소' },
  ],
  snsSpots: [
    { id: 'o-s1', title: '도톤보리 글리코 간판', subtitle: '오사카 필수 인증샷', image: 'https://placehold.co/300x200/28c5f0/ffffff?text=Glico+Sign', tag: 'SNS스팟' },
    { id: 'o-s2', title: '우메다 스카이 빌딩', subtitle: '야경이 황홀한 루프탑', image: 'https://placehold.co/300x200/005f80/ffffff?text=Sky+Building', tag: 'SNS스팟' },
    { id: 'o-s3', title: '신세카이 쓰텐카쿠', subtitle: '레트로 감성 가득', image: 'https://placehold.co/300x200/6f86f5/ffffff?text=Tsutenkaku', tag: 'SNS스팟' },
  ],
  restaurants: [
    { id: 'o-r1', title: '이치란 라멘 난바점', subtitle: '혼자 먹기 딱 좋은 칸막이석', image: 'https://placehold.co/300x200/28c5f0/ffffff?text=Ichiran', tag: '맛집' },
    { id: 'o-r2', title: '구리코야 타코야키', subtitle: '도톤보리 원조 타코야키', image: 'https://placehold.co/300x200/005f80/ffffff?text=Takoyaki', tag: '맛집' },
    { id: 'o-r3', title: '마루후쿠 커피', subtitle: '100년 된 오사카 명물 카페', image: 'https://placehold.co/300x200/6f86f5/ffffff?text=Marufuku', tag: '맛집' },
  ],
};

// ── 시즈오카 ────────────────────────────────────────────────
const SHIZUOKA: ExploreResult = {
  itinerary: [
    { id: 's-i1', title: '시즈오카 후지산 3일 코스', subtitle: '후지산 뷰포인트 총집합', image: 'https://placehold.co/300x200/28c5f0/ffffff?text=Fuji+Plan', tag: '추천일정' },
    { id: 's-i2', title: '시즈오카 차(茶) 투어', subtitle: '녹차 산지 체험 여행', image: 'https://placehold.co/300x200/005f80/ffffff?text=Tea+Tour', tag: '추천일정' },
    { id: 's-i3', title: '아타미 온천 힐링', subtitle: '바다 뷰 료칸에서 1박', image: 'https://placehold.co/300x200/6f86f5/ffffff?text=Atami+Onsen', tag: '추천일정' },
  ],
  lodging: [
    { id: 's-l1', title: '후지 온천 료칸', subtitle: '후지산 조망 노천탕', image: 'https://placehold.co/300x200/28c5f0/ffffff?text=Fuji+Ryokan', tag: '숙소' },
    { id: 's-l2', title: '시즈오카 그랜드호텔', subtitle: '역 도보 3분, 조식 포함', image: 'https://placehold.co/300x200/005f80/ffffff?text=Grand+Hotel', tag: '숙소' },
    { id: 's-l3', title: '아타미 씨사이드 호텔', subtitle: '오션뷰 객실', image: 'https://placehold.co/300x200/6f86f5/ffffff?text=Seaside', tag: '숙소' },
  ],
  snsSpots: [
    { id: 's-s1', title: '가와구치코 반영 포인트', subtitle: '후지산이 담기는 호수', image: 'https://placehold.co/300x200/28c5f0/ffffff?text=Kawaguchiko', tag: 'SNS스팟' },
    { id: 's-s2', title: '니혼다이라 로프웨이', subtitle: '후지산+태평양 파노라마', image: 'https://placehold.co/300x200/005f80/ffffff?text=Nihondaira', tag: 'SNS스팟' },
    { id: 's-s3', title: '오비라 차밭 포토존', subtitle: '녹차밭 사이 인증샷', image: 'https://placehold.co/300x200/6f86f5/ffffff?text=Tea+Field', tag: 'SNS스팟' },
  ],
  restaurants: [
    { id: 's-r1', title: '시즈오카 오뎅', subtitle: '흑수 베이스 오뎅 원조', image: 'https://placehold.co/300x200/28c5f0/ffffff?text=Oden', tag: '맛집' },
    { id: 's-r2', title: '사쿠라 에비 덮밥', subtitle: '스루가만 벚꽃새우 제철 별미', image: 'https://placehold.co/300x200/005f80/ffffff?text=Sakura+Ebi', tag: '맛집' },
    { id: 's-r3', title: '후지미야 야키소바', subtitle: '후지산 아래 소울푸드', image: 'https://placehold.co/300x200/6f86f5/ffffff?text=Yakisoba', tag: '맛집' },
  ],
};

// ── 마쓰야마 ────────────────────────────────────────────────
const MATSUYAMA: ExploreResult = {
  itinerary: [
    { id: 'm-i1', title: '마쓰야마 2박3일 코스', subtitle: '도고온천 + 마쓰야마성', image: 'https://placehold.co/300x200/28c5f0/ffffff?text=Matsuyama+Plan', tag: '추천일정' },
    { id: 'm-i2', title: '시코쿠 순례 입문', subtitle: '마쓰야마 출발 미니 순례', image: 'https://placehold.co/300x200/005f80/ffffff?text=Shikoku+Tour', tag: '추천일정' },
    { id: 'm-i3', title: '마쓰야마 근교 자연 힐링', subtitle: '오치 강변 + 별밤 캠핑', image: 'https://placehold.co/300x200/6f86f5/ffffff?text=Ochi+Healing', tag: '추천일정' },
  ],
  lodging: [
    { id: 'm-l1', title: '도고 료칸 후나야', subtitle: '나쓰메 소세키가 묵던 료칸', image: 'https://placehold.co/300x200/28c5f0/ffffff?text=Dogo+Ryokan', tag: '숙소' },
    { id: 'm-l2', title: 'ANA 크라운 플라자', subtitle: '마쓰야마역 도보 5분', image: 'https://placehold.co/300x200/005f80/ffffff?text=ANA+Crown', tag: '숙소' },
    { id: 'm-l3', title: '도고 가이칸', subtitle: '도고온천 입구, 뷰 맛집', image: 'https://placehold.co/300x200/6f86f5/ffffff?text=Dogo+Kaikan', tag: '숙소' },
  ],
  snsSpots: [
    { id: 'm-s1', title: '도고 온천 본관', subtitle: '일본 최고령 온천 건물', image: 'https://placehold.co/300x200/28c5f0/ffffff?text=Dogo+Onsen', tag: 'SNS스팟' },
    { id: 'm-s2', title: '마쓰야마성 천수각 야경', subtitle: '로프웨이로 올라가는 야경 뷰', image: 'https://placehold.co/300x200/005f80/ffffff?text=Castle+Night', tag: 'SNS스팟' },
    { id: 'm-s3', title: '하이카라 거리', subtitle: '메이지 시대 레트로 거리', image: 'https://placehold.co/300x200/6f86f5/ffffff?text=Haikara+St', tag: 'SNS스팟' },
  ],
  restaurants: [
    { id: 'm-r1', title: '타이야키 혼포', subtitle: '도고온천 명물 붕어빵', image: 'https://placehold.co/300x200/28c5f0/ffffff?text=Taiyaki', tag: '맛집' },
    { id: 'm-r2', title: '잇신지 야키도리', subtitle: '마쓰야마 최고 닭꼬치집', image: 'https://placehold.co/300x200/005f80/ffffff?text=Yakitori', tag: '맛집' },
    { id: 'm-r3', title: '세토우치 해산물 덮밥', subtitle: '세토내해 신선한 회덮밥', image: 'https://placehold.co/300x200/6f86f5/ffffff?text=Seto+Don', tag: '맛집' },
  ],
};

export const EXPLORE_MOCK: Record<string, ExploreResult> = {
  오사카: OSAKA,
  시즈오카: SHIZUOKA,
  마쓰야마: MATSUYAMA,
};

export function getExploreMock(city: string): ExploreResult {
  return EXPLORE_MOCK[city] ?? OSAKA;
}
