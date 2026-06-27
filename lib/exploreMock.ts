// lib/exploreMock.ts
// ===========================================================================
// 탐색(explore) 탭 카드 데이터 — 네일동 실크롤링 데이터(QnA+블로그) 기반.
// 자동 생성: extract_explore_data.py + fill_explore_images.py 참고
// (데이터 갱신 시 두 스크립트를 다시 실행한 뒤 이 파일을 재생성할 것)
//
// image: Unsplash에서 받아온 분위기 사진 (실제 그 가게/장소 사진은 아님).
//        place_name이 있는 카드는 장소명+도시로 검색해 카드마다 다른 사진을
//        받았고, place_name이 없거나 검색 결과가 없는 카드는 도시+카테고리
//        폴백 이미지를 사용함.
// ===========================================================================

export type ExploreCard = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string | null;
  place_name: string | null;
  place_confidence: 'high' | 'low' | 'none';
  link: string;
  date: string;
  quality_score: number;
};

export type ExploreResult = {
  itinerary: ExploreCard[];
  lodging: ExploreCard[];
  restaurants: ExploreCard[];
  snsSpots: ExploreCard[];
};

const DEFAULT_DATA: Record<string, ExploreResult> = {
  "오사카": {
    "itinerary": [
      {
        "id": "오사카_itinerary_224318024698_0",
        "tag": "추천일정",
        "title": "26년 6월의 일상 02",
        "subtitle": "떠나자 일본으로 연애시절에는 스케줄 맞추기가 쉽지않아서 오빠랑 해외여행을 가…",
        "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://blog.naver.com/com_5153/224318024698",
        "date": "2026-06-16",
        "quality_score": 0.9
      },
      {
        "id": "오사카_itinerary_754301267204_1",
        "tag": "추천일정",
        "title": "초행으로 후쿠오카를 가시는 분들에게 후쿠오카정리 기본편 (공항이동,시내이동,숙소)",
        "subtitle": "제가 평소에 후쿠오카에 대해 주저리주저리 아는척을 많이 했는데 도움이 될런지…",
        "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4301267?boardtype=L&menuid=204",
        "date": "2026-05-30",
        "quality_score": 0.9
      },
      {
        "id": "오사카_itinerary_224318025326_2",
        "tag": "추천일정",
        "title": "돼지력 뽐내는 오사카 3박 4일 여행 일정 1일차 (찐맛집 공유",
        "subtitle": "DAY1 웰리나 신사이바시 나고미 - 도톤보리 - 토미타규카츠 - 잇신도 -…",
        "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://blog.naver.com/flypig_g/224318025326",
        "date": "2026-06-16",
        "quality_score": 0.9
      },
      {
        "id": "오사카_itinerary_754283591204_3",
        "tag": "추천일정",
        "title": "[알펜루트 혼여-2탄] 4.24.~29. / 오사카-교토-도야마-무로도(1박)- 나고야",
        "subtitle": "4.28. 무로도 - 나고야 무로도의 밤 무로도에서 환상적이었던 기억을 뒤로…",
        "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4283591?boardtype=L&menuid=204",
        "date": "2026-05-05",
        "quality_score": 0.9
      }
    ],
    "lodging": [
      {
        "id": "오사카_lodging_754205711204_0",
        "tag": "숙소",
        "title": "오사카 우메다 힐튼 다녀왔어요! 강추해요!!!",
        "subtitle": "오늘 귀국했어요. 오사카는 2번째인데 이번엔 아이와 함께 3인 가족으로 왔네…",
        "image": "https://images.unsplash.com/photo-1737382428408-b8d84d2cf44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUElQjAlRUIlQTklOTQlRUIlOEIlQTQlMjAlRUQlOUUlOTAlRUQlOEElQkMlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2MXww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "우메다 힐튼",
        "place_confidence": "low",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4205711?boardtype=L&menuid=204",
        "date": "2026-02-02",
        "quality_score": 0.9
      },
      {
        "id": "오사카_lodging_224316536831_1",
        "tag": "숙소",
        "title": "오사카 7살 아이랑 호텔유니버셜포트 / 유니버셜에서",
        "subtitle": "아이와 유니버셜 가보고 느낀점은 가까운게 최고다 오픈런과 발바닥 아픔 이슈에…",
        "image": "https://images.unsplash.com/photo-1732522158761-6dbc6266e47f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwNnww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://blog.naver.com/sssy325/224316536831",
        "date": "2026-06-15",
        "quality_score": 0.9
      },
      {
        "id": "오사카_lodging_224319267482_2",
        "tag": "숙소",
        "title": "오사카 가족여행 야마토야 혼텐 료칸 재패니즈 리버뷰룸 조식",
        "subtitle": "사랑하는 가족과 함께 떠나는 오사카 여행은 생각만 해도 설레는 일이 될거에요…",
        "image": "https://images.unsplash.com/photo-1713970943504-04e8a3e3abac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOTUlQkMlRUIlQTclODglRUQlODYlQTAlRUMlOTUlQkMlMjAlRUQlOTglQkMlRUQlODUlOTAlMjAlRUIlQTMlOEMlRUMlQjklQjglMjAlRUMlOUUlQUMlRUQlOEMlQTglRUIlOEIlODglRUMlQTYlODglMjAlRUIlQTYlQUMlRUIlQjIlODQlRUIlQjclQjAlRUIlQTMlQjglMjAlRUMlQTElQjAlRUMlOEIlOUQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2Mnww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "야마토야 혼텐 료칸 재패니즈 리버뷰룸 조식",
        "place_confidence": "low",
        "link": "https://blog.naver.com/lkhs9149/224319267482",
        "date": "2026-06-18",
        "quality_score": 0.9
      },
      {
        "id": "오사카_lodging_224318129473_3",
        "tag": "숙소",
        "title": "일본 오사카 숙소 추천 컴포트호텔 신사이바시 조식",
        "subtitle": "일본 오사카 숙소 추천 컴포트호텔 신사이바시 조식 이번 일본 오사카 3박4일…",
        "image": "https://images.unsplash.com/photo-1771056700883-a3f5146497fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUQlQkMlRUIlQjMlQjglMjAlRUMlODglOTklRUMlODYlOEMlMjAlRUMlQkIlQjQlRUQlOEYlQUMlRUQlOEElQjglRUQlOTglQjglRUQlODUlOTQlMjAlRUMlOEIlQTAlRUMlODIlQUMlRUMlOUQlQjQlRUIlQjAlOTQlRUMlOEIlOUMlMjAlRUMlQTElQjAlRUMlOEIlOUQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2M3ww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "일본 숙소 컴포트호텔 신사이바시 조식",
        "place_confidence": "low",
        "link": "https://blog.naver.com/franrom/224318129473",
        "date": "2026-06-16",
        "quality_score": 0.9
      }
    ],
    "restaurants": [
      {
        "id": "오사카_restaurants_224318008052_0",
        "tag": "맛집",
        "title": "일본 여행 34일차",
        "subtitle": "일본 여행 3일차 아침 ️ 오늘도 어김없이 아침은 전날 마트에서 사 두었던…",
        "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://blog.naver.com/ma3323/224318008052",
        "date": "2026-06-16",
        "quality_score": 0.9
      },
      {
        "id": "오사카_restaurants_224318033771_1",
        "tag": "맛집",
        "title": "오사카 스키야키 맛집 추천 역대급 A5등급 와규 쿠시카츠",
        "subtitle": "오사카 스키야키 쿠시카츠 하루나 혼마치점 Sukiyaki Kushikatsu…",
        "image": "https://images.unsplash.com/photo-1699154016198-dd89c2da4ffd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOEElQTQlRUQlODIlQTQlRUMlOTUlQkMlRUQlODIlQTQlMjAlRUIlQTclOUIlRUMlQTclOTElMjAlRUMlOTclQUQlRUIlOEMlODAlRUElQjglODklMjBBNSVFQiU5MyVCMSVFQSVCOCU4OSUyMCVFQyU5OSU4MCVFQSVCNyU5QyUyMCVFQyVCRiVBMCVFQyU4QiU5QyVFQyVCOSVCNCVFQyVCOCVBMCUyME9zYWthJTIwSmFwYW58ZW58MHx8fHwxNzgyNTQxNjYzfDA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "스키야키 맛집 역대급 A5등급 와규 쿠시카츠",
        "place_confidence": "low",
        "link": "https://blog.naver.com/11sec/224318033771",
        "date": "2026-06-16",
        "quality_score": 0.9
      },
      {
        "id": "오사카_restaurants_224318057174_2",
        "tag": "맛집",
        "title": "후기 ｜도톤보리보다 훨씬 웨이팅 적은 일본 라멘 맛집",
        "subtitle": "안녕하세요 미미언니입니다 오사카 여행 중 이치란라멘은 꼭 먹으려고 계획하였었…",
        "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://blog.naver.com/mimiz3z/224318057174",
        "date": "2026-06-16",
        "quality_score": 0.9
      },
      {
        "id": "오사카_restaurants_224318071860_3",
        "tag": "맛집",
        "title": "후구쿠지라in도톤보리(오사카.Japan)",
        "subtitle": "복어를 좋아한다면 추천 2022. 12. 09 착한 가이드님이 저녁에 자유시…",
        "image": "https://images.unsplash.com/photo-1596240748549-6ec0f32d4c95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOUIlODQlRUElQjUlQUMlRUMlQkYlQTAlRUMlQTclODAlRUIlOUQlQkNpbiVFQiU4RiU4NCVFRCU4NiVBNCVFQiVCMyVCNCVFQiVBNiVBQyUyOC5KYXBhbiUyOSUyME9zYWthJTIwSmFwYW58ZW58MHx8fHwxNzgyNTQxNjY0fDA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "후구쿠지라in도톤보리(.Japan)",
        "place_confidence": "low",
        "link": "https://blog.naver.com/bluedog0611/224318071860",
        "date": "2026-06-16",
        "quality_score": 0.9
      }
    ],
    "snsSpots": [
      {
        "id": "오사카_snsSpots_224303160107_0",
        "tag": "SNS스팟",
        "title": "2026 오사카 유니버셜 스튜디오 닌텐도월드 완벽 정리 여름",
        "subtitle": "2026년 여름, 게임 속으로 떠나는 여행 안녕하세요 2026년 최신 여행…",
        "image": "https://images.unsplash.com/photo-1737382428408-b8d84d2cf44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlMjAlRUMlOEElQTQlRUQlOEElOUMlRUIlOTQlOTQlRUMlOTglQTQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2NXww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "유니버셜 스튜디오",
        "place_confidence": "low",
        "link": "https://blog.naver.com/tiger266/224303160107",
        "date": "2026-06-17",
        "quality_score": 0.9
      },
      {
        "id": "오사카_snsSpots_224318127107_1",
        "tag": "SNS스팟",
        "title": "오사카 유니버셜 후기 | 익스프레스 없이 일반 입장권으로",
        "subtitle": "오사카 여행에서 절대 빼놓을 수 없는 코스가 바로 유니버셜 스튜디오 재팬(U…",
        "image": "https://images.unsplash.com/photo-1603638710460-f20107e4ed47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2Nnww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "유니버셜",
        "place_confidence": "low",
        "link": "https://blog.naver.com/bellak1104/224318127107",
        "date": "2026-06-16",
        "quality_score": 0.9
      },
      {
        "id": "오사카_snsSpots_224318116667_2",
        "tag": "SNS스팟",
        "title": "USJ 유니버셜 스튜디오 재팬 7월 말 초성수기 입장권 정리",
        "subtitle": "방학의 시작과 아들 생일에 맞춰 오사카 유니버셜 재팬 일정을 짜고 있어요-…",
        "image": "https://images.unsplash.com/photo-1737382428408-b8d84d2cf44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxVU0olMjAlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlMjAlRUMlOEElQTQlRUQlOEElOUMlRUIlOTQlOTQlRUMlOTglQTQlMjAlRUMlOUUlQUMlRUQlOEMlQUMlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2N3ww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "USJ 유니버셜 스튜디오 재팬",
        "place_confidence": "low",
        "link": "https://blog.naver.com/gjdodud/224318116667",
        "date": "2026-06-16",
        "quality_score": 0.9
      },
      {
        "id": "오사카_snsSpots_224318026526_3",
        "tag": "SNS스팟",
        "title": "아이와 오사카 가족여행, 4박5일, 비오는날 유니버셜스튜디오",
        "subtitle": "아이와 오사카 가족여행 4박5일, 2일차 비오는날 유니버셜스튜디오 이용후기…",
        "image": "https://images.unsplash.com/photo-1603638710460-f20107e4ed47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlRUMlOEElQTQlRUQlOEElOUMlRUIlOTQlOTQlRUMlOTglQTQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2OHww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "유니버셜스튜디오",
        "place_confidence": "low",
        "link": "https://blog.naver.com/sosoharu1129/224318026526",
        "date": "2026-06-16",
        "quality_score": 0.9
      }
    ]
  },
  "시즈오카": {
    "itinerary": [
      {
        "id": "시즈오카_itinerary_224309230714_0",
        "tag": "추천일정",
        "title": "시즈오카 여행 Day1 - 후지노미야역 고리키군버스 오후 투어",
        "subtitle": "260530박 4일 ꒰՞⸝⸝ʚ̴̶̷̷ · ʚ̴̶̷̷⸝⸝՞꒱ 휴직, 그 시작…",
        "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://blog.naver.com/hollyrj/224309230714",
        "date": "2026-06-08",
        "quality_score": 0.9
      },
      {
        "id": "시즈오카_itinerary_754285157204_1",
        "tag": "추천일정",
        "title": "후지노미야에서 가와구치코로 넘어가는 버스시간",
        "subtitle": "안녕하세요 골든위크에 아타미에서 3일 보내고 시즈오카와서 자고 오늘아침에 j…",
        "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "후지노미야에서 가와구치코로 넘어가는 버스시간",
        "place_confidence": "low",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4285157?boardtype=L&menuid=204",
        "date": "2026-05-07",
        "quality_score": 0.9
      },
      {
        "id": "시즈오카_itinerary_754143155204_2",
        "tag": "추천일정",
        "title": "일본 전국일주 완료를 기념하며 올리는글 (경현치 47개도도부현 여행사진) 사진많음주의",
        "subtitle": "안녕하세요 올해 5월 2주간의 시코쿠일주여행을 완료하며 십몇년간의 일본전국일…",
        "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4143155?boardtype=L&menuid=204",
        "date": "2025-12-01",
        "quality_score": 0.9
      },
      {
        "id": "시즈오카_itinerary_754310585813_3",
        "tag": "추천일정",
        "title": "작년 여름에 갔던 나고야 요약",
        "subtitle": "AI 동영상으로 요약본입니다. 실제로는 25년 여름 휴가때 첫 해외여행을 나…",
        "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4310585?boardtype=L&menuid=813",
        "date": "2026-06-12",
        "quality_score": 0.9
      }
    ],
    "lodging": [
      {
        "id": "시즈오카_lodging_754264272204_0",
        "tag": "숙소",
        "title": "시티오 시즈오카호텔",
        "subtitle": "5박6일 일정에서 4박은 시즈오카역 부근 선팰리스호텔에서 숙박을 했고, 마지…",
        "image": "https://images.unsplash.com/photo-1744549112545-714103faaf49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOEIlOUMlRUQlOEIlQjAlRUMlOTglQTQlMjAlRUQlOTglQjglRUQlODUlOTQlMjBTaGl6dW9rYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY3MHww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "시티오 호텔",
        "place_confidence": "low",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4264272?boardtype=L&menuid=204",
        "date": "2026-04-11",
        "quality_score": 0.9
      },
      {
        "id": "시즈오카_lodging_542023991002_1",
        "tag": "숙소",
        "title": "코트야드 바이 메리어트 나고야(コートヤード・バイ・マリオット名古屋) THE LOUNGE(더 라운지) シャンパンジャーニー(샴팡무제한 애프터눈티)",
        "subtitle": "네이버 카페 대한민국 모임의 시작, 네이버 카페 naver.me ※. 202…",
        "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4202399?boardtype=L&menuid=1002",
        "date": "2026-01-29",
        "quality_score": 0.9
      },
      {
        "id": "시즈오카_lodging_540643291002_2",
        "tag": "숙소",
        "title": "[일본여행 7] 소도시 시즈오카현(이즈반도, 미시마시) 여행 4일차_미시마 도큐호텔 후기 및 주변 마트(이온몰) 쇼핑→시즈오카 공항 렌터카 반납 및 정통 일식집 식사 & 에필로그",
        "subtitle": "시리즈의 마지막 여행기입니다. 시즈오카현 주변 도시 여행을 하실 분들에게 도…",
        "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4064329?boardtype=L&menuid=1002",
        "date": "2025-09-05",
        "quality_score": 0.9
      },
      {
        "id": "시즈오카_lodging_754295538993_3",
        "tag": "숙소",
        "title": "시즈오카 3성 호텔 강추",
        "subtitle": "1. 숙박업소명 (등급) : 호텔 가든 스퀘어 시즈오카 2. 위치 또는 지역…",
        "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "호텔 가든 스퀘어 시즈오카",
        "place_confidence": "high",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4295538?boardtype=L&menuid=993",
        "date": "2026-05-21",
        "quality_score": 0.9
      }
    ],
    "restaurants": [
      {
        "id": "시즈오카_restaurants_542840601002_0",
        "tag": "맛집",
        "title": "키르훼봉 이제 단골하겠어요~~",
        "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 키르훼봉 3. 지역 : 나고야…",
        "image": "https://images.unsplash.com/photo-1653047016706-89e86e55a092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlODIlQTQlRUIlQTUlQjQlRUQlOUIlQkMlRUIlQjQlODklMjBTaGl6dW9rYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY3Mnww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "키르훼봉",
        "place_confidence": "high",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4284060?boardtype=L&menuid=1002",
        "date": "2026-05-06",
        "quality_score": 0.9
      },
      {
        "id": "시즈오카_restaurants_542000351002_1",
        "tag": "맛집",
        "title": "아타미 펄스타 호텔(熱海パールスターホテル) 라운지 오션 브리즈(ラウンジ オーシャンブリーズ) いちごと桜のアフタヌーンティ(딸기와 벚꽃 애프터눈티)",
        "subtitle": "3박4일 시즈오카 왕복 1일차 입니다. 아타미에서 열리는 애프터눈티를 발견하…",
        "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4200035?boardtype=L&menuid=1002",
        "date": "2026-01-27",
        "quality_score": 0.9
      },
      {
        "id": "시즈오카_restaurants_542059271002_2",
        "tag": "맛집",
        "title": "미야코호텔 욧카이치(都ホテル 四日市) PARMIERE(パルミエール) ストロベリー＆ショコラ アフタヌーンティ―(딸기초코 애프터눈티)",
        "subtitle": "3박4일 시즈오카왕복 3일차 나고야에서 숙박후 미에현으로 갑니다. 미에현의…",
        "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4205927?boardtype=L&menuid=1002",
        "date": "2026-02-02",
        "quality_score": 0.9
      },
      {
        "id": "시즈오카_restaurants_542066641002_3",
        "tag": "맛집",
        "title": "호텔 아소시아 시즈오카(ホテルアソシア静岡) 파고라(パーゴラ) 静岡マルシェ冬の季節を味わうディナーブッフェ(디너뷔페 애프터눈티)",
        "subtitle": "3박4일 3일차 저녁은 아이치현 나고야에서 조식을 하고, 미에현 욧카이치에서…",
        "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4206664?boardtype=L&menuid=1002",
        "date": "2026-02-02",
        "quality_score": 0.9
      }
    ],
    "snsSpots": [
      {
        "id": "시즈오카_snsSpots_224308891134_0",
        "tag": "SNS스팟",
        "title": "[시즈오카 4박 5일] 3일차 꿈의 대교, 시즈오카역, 시미즈역",
        "subtitle": "후모톳바라의 새벽은 어마무시했다. 바람소리에 잠을 이룰 수 없을 정도로 비바…",
        "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://blog.naver.com/jjleee_/224308891134",
        "date": "2026-06-07",
        "quality_score": 0.9
      },
      {
        "id": "시즈오카_snsSpots_224309442587_1",
        "tag": "SNS스팟",
        "title": "일본 소도시 감성 제대로였던 4월 시즈오카여행 후기｜후지산",
        "subtitle": "안녕하시렵니까? 노언더스탠드, 박슐랭입니다. 4월 초에 일본 시즈오카 여행을…",
        "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "일본 소도시 감성 제대로였던 4월 ｜후지산",
        "place_confidence": "low",
        "link": "https://blog.naver.com/nounderstanding/224309442587",
        "date": "2026-06-08",
        "quality_score": 0.9
      },
      {
        "id": "시즈오카_snsSpots_754285789204_2",
        "tag": "SNS스팟",
        "title": "후지역에서 후지산 훑어보기(아이와함께)",
        "subtitle": "버스투어예약이 다 차버려서 예약은 못하고 뚜벅이로 다녀와야겠다 생각하고 찾아…",
        "image": "https://images.unsplash.com/photo-1715051631750-047f75186af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOUIlODQlRUMlQTclODAlRUMlOTclQUQlRUMlOTclOTAlRUMlODQlOUMlMjAlRUQlOUIlODQlRUMlQTclODAlRUMlODIlQjAlMjAlRUQlOUIlOTElRUMlOTYlQjQlRUIlQjMlQjQlRUElQjglQjAlMjglRUQlOTUlQTglRUElQkIlOTglMjklMjBTaGl6dW9rYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY3M3ww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "후지역에서 후지산 훑어보기(함께)",
        "place_confidence": "low",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4285789?boardtype=L&menuid=204",
        "date": "2026-05-08",
        "quality_score": 0.9
      },
      {
        "id": "시즈오카_snsSpots_754248242204_3",
        "tag": "SNS스팟",
        "title": "알펜루트에 대해서 자세히 알려드릴게요 알펜루트는 어디에 있고 무엇을 말하는지, 웹티켓, 패스, 코스, 볼거리등 알펜루트에 대한 자세한 설명 ( 정보글이라 장문입니다)",
        "subtitle": "안녕하세요 장문의 정보글 깔끔입니다 요즘 카페에 들어오면 질문글에 알펜루트에…",
        "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4248242?boardtype=L&menuid=204",
        "date": "2026-03-22",
        "quality_score": 0.9
      }
    ]
  },
  "마쓰야마": {
    "itinerary": [
      {
        "id": "마쓰야마_itinerary_224303625319_0",
        "tag": "추천일정",
        "title": "일본 마쓰야마 여행 준비와 추천 일정 가이드",
        "subtitle": "일본 소도시 여행의 매력을 찾는 분들이라면 마쓰야마를 주목해 볼 필요가 있습…",
        "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://blog.naver.com/onebitepark/224303625319",
        "date": "2026-06-02",
        "quality_score": 0.9
      },
      {
        "id": "마쓰야마_itinerary_754302972813_1",
        "tag": "추천일정",
        "title": "마쓰야마 다카마쓰 쿠라시키 이마바리",
        "subtitle": "마쓰야마 5시쯤 도착 5시30분 렌트해서 밥부터 먹고 도고온천 갔습니다. 별…",
        "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUIlOEIlQTQlRUMlQjklQjQlRUIlQTclODglRUMlOTMlQjAlMjAlRUMlQkYlQTAlRUIlOUQlQkMlRUMlOEIlOUMlRUQlODIlQTQlMjAlRUMlOUQlQjQlRUIlQTclODglRUIlQjAlOTQlRUIlQTYlQUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2NzV8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "다카마쓰 쿠라시키 이마바리",
        "place_confidence": "low",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4302972?boardtype=L&menuid=813",
        "date": "2026-06-01",
        "quality_score": 0.9
      },
      {
        "id": "마쓰야마_itinerary_754301306813_2",
        "tag": "추천일정",
        "title": "아빠랑 다녀온 마쓰야마 후기 1일차",
        "subtitle": "우동과 초밥을 좋아하는 아빠가 제가 일본을 갈때마다 부러워하시며 질투하셨는데…",
        "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4301306?boardtype=L&menuid=813",
        "date": "2026-05-30",
        "quality_score": 0.9
      },
      {
        "id": "마쓰야마_itinerary_754298172813_3",
        "tag": "추천일정",
        "title": "가족과 함께 4박 5일 마쓰야마 여행 후기 (장문 주의)",
        "subtitle": "일본 여행은 이번이 3번째 입니다. (오사카, 나고야 다녀옴) 오사카는 아들…",
        "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "가족과 함께 4박 5일",
        "place_confidence": "low",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4298172?boardtype=L&menuid=813",
        "date": "2026-05-25",
        "quality_score": 0.9
      }
    ],
    "lodging": [
      {
        "id": "마쓰야마_lodging_224297881539_0",
        "tag": "숙소",
        "title": "[26년 5월] 마쓰야마 여행. 둘째날",
        "subtitle": "마쓰야마 여행 둘째날. 짜잔 칸데오 호텔 조식. 일어나자마자 온천 원모타임…",
        "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://blog.naver.com/dadada1206/224297881539",
        "date": "2026-05-27",
        "quality_score": 0.9
      },
      {
        "id": "마쓰야마_lodging_754303173993_1",
        "tag": "숙소",
        "title": "아나 크라운 플라자 마쓰야마",
        "subtitle": "1. 숙박업소명 (등급) : 아나 크라운 플라자 마쓰야마 (ANA Crown…",
        "image": "https://images.unsplash.com/photo-1676917350107-964194678afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOTUlODQlRUIlODIlOTglMjAlRUQlODElQUMlRUIlOUQlQkMlRUMlOUElQjQlMjAlRUQlOTQlOEMlRUIlOUQlQkMlRUMlOUUlOTAlMjAlRUIlQTclODglRUMlOTMlQjAlRUMlOTUlQkMlRUIlQTclODglMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2Nzd8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "아나 크라운 플라자 마쓰야마",
        "place_confidence": "high",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4303173?boardtype=L&menuid=993",
        "date": "2026-06-01",
        "quality_score": 0.9
      },
      {
        "id": "마쓰야마_lodging_754299570993_2",
        "tag": "숙소",
        "title": "조식이 괜찮은 가성비 호텔 소개(우타즈 지역)",
        "subtitle": "1. 숙박업소명 (등급) : 호텔 아네시스 세토오하시 2. 위치 또는 지역…",
        "image": "https://images.unsplash.com/photo-1624517608532-c6cd07c012eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOTglQjglRUQlODUlOTQlMjAlRUMlOTUlODQlRUIlODQlQTQlRUMlOEIlOUMlRUMlOEElQTQlMjAlRUMlODQlQjglRUQlODYlQTAlRUMlOTglQTQlRUQlOTUlOTglRUMlOEIlOUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2Nzh8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "호텔 아네시스 세토오하시",
        "place_confidence": "high",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4299570?boardtype=L&menuid=993",
        "date": "2026-05-27",
        "quality_score": 0.9
      },
      {
        "id": "마쓰야마_lodging_754297757993_3",
        "tag": "숙소",
        "title": "마쓰야마 가성비 호텔, 체크인 마쓰야마",
        "subtitle": "1. 숙박업소명 (등급) : 호텔 체크 인 마쓰야마 2. 위치 또는 지역 :…",
        "image": "https://images.unsplash.com/photo-1743511789084-dd239c460b5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOTglQjglRUQlODUlOTQlMjAlRUMlQjIlQjQlRUQlODElQUMlMjAlRUMlOUQlQjglMjAlRUIlQTclODglRUMlOTMlQjAlRUMlOTUlQkMlRUIlQTclODglMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2Nzh8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "호텔 체크 인 마쓰야마",
        "place_confidence": "high",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4297757?boardtype=L&menuid=993",
        "date": "2026-05-25",
        "quality_score": 0.9
      }
    ],
    "restaurants": [
      {
        "id": "마쓰야마_restaurants_543098421002_0",
        "tag": "맛집",
        "title": "마쓰야마 카페 Goodtime Stand",
        "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 굿타임스탠드 3. 지역 : 마…",
        "image": "https://images.unsplash.com/photo-1669612803668-2b2a770f9890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUElQjUlQkYlRUQlODMlODAlRUMlOUUlODQlRUMlOEElQTQlRUQlODMlQTAlRUIlOTMlOUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2Nzl8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "굿타임스탠드",
        "place_confidence": "high",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4309842?boardtype=L&menuid=1002",
        "date": "2026-06-11",
        "quality_score": 0.9
      },
      {
        "id": "마쓰야마_restaurants_543091251002_1",
        "tag": "맛집",
        "title": "마쓰야마 회전초밥 스시에몬 도고온천점",
        "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 스시에몽 도고온천점 3. 지역…",
        "image": "https://images.unsplash.com/photo-1580355275559-10c832e123f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOEElQTQlRUMlOEIlOUMlRUMlOTclOTAlRUIlQUElQkQlMjAlRUIlOEYlODQlRUElQjMlQTAlRUMlOTglQTglRUMlQjIlOUMlRUMlQTAlOTAlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2ODB8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "스시에몽 도고온천점",
        "place_confidence": "high",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4309125?boardtype=L&menuid=1002",
        "date": "2026-06-10",
        "quality_score": 0.9
      },
      {
        "id": "마쓰야마_restaurants_540302311002_2",
        "tag": "맛집",
        "title": "마쓰야마 야키토리집에서 둘이 13만원치 먹은 후기",
        "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 토리지로( とり次郎) 3. 지…",
        "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlODYlQTAlRUIlQTYlQUMlRUMlQTclODAlRUIlQTElOUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2ODF8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "토리지로",
        "place_confidence": "high",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4030231?boardtype=L&menuid=1002",
        "date": "2025-07-24",
        "quality_score": 0.9
      },
      {
        "id": "마쓰야마_restaurants_542935621002_3",
        "tag": "맛집",
        "title": "마쓰야마 찐로컬 레스토랑 노사키",
        "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 레스토랑 노사키 3. 지역 :…",
        "image": "https://images.unsplash.com/photo-1676917350107-964194678afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUIlQTAlODglRUMlOEElQTQlRUQlODYlQTAlRUIlOUUlOTElMjAlRUIlODUlQjglRUMlODIlQUMlRUQlODIlQTQlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2ODF8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "레스토랑 노사키",
        "place_confidence": "high",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4293562?boardtype=L&menuid=1002",
        "date": "2026-05-19",
        "quality_score": 0.9
      }
    ],
    "snsSpots": [
      {
        "id": "마쓰야마_snsSpots_754227369813_0",
        "tag": "SNS스팟",
        "title": "뒤뚱뒤뚱 마쓰야마 4일차 > ② 이시테지의 비밀 통로 '만트라 동굴' 속으로",
        "subtitle": "2026년 2월 2일 이시테지 본당 뒤편, 입을 벌리고 있는 어두운 동굴이…",
        "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4227369?boardtype=L&menuid=813",
        "date": "2026-02-23",
        "quality_score": 0.9
      },
      {
        "id": "마쓰야마_snsSpots_224298785986_1",
        "tag": "SNS스팟",
        "title": "마쓰야마 렌터카 근교여행 일본의 스위스 텐구고원과 시코쿠",
        "subtitle": "마쓰야마 렌터카여행의 마지막 코스이자 하이라이트, 일본의 스위스라고 불리는…",
        "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "렌터카 근교 일본의 스위스 텐구고원과 시코쿠",
        "place_confidence": "low",
        "link": "https://blog.naver.com/everybean/224298785986",
        "date": "2026-05-28",
        "quality_score": 0.9
      },
      {
        "id": "마쓰야마_snsSpots_754302099813_2",
        "tag": "SNS스팟",
        "title": "마쓰야마 히가시도고 소라토모리 온천",
        "subtitle": "3박4일로 마쓰야마 혼여 왔어요 오늘이 3일차네요. 첫날은 무료쿠폰으로 마쓰…",
        "image": "https://images.unsplash.com/photo-1549548284-28057f92c497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOUUlODglRUElQjAlODAlRUMlOEIlOUMlRUIlOEYlODQlRUElQjMlQTAlMjAlRUMlODYlOEMlRUIlOUQlQkMlRUQlODYlQTAlRUIlQUElQTglRUIlQTYlQUMlMjAlRUMlOTglQTglRUMlQjIlOUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2ODN8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": "히가시도고 소라토모리 온천",
        "place_confidence": "low",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4302099?boardtype=L&menuid=813",
        "date": "2026-05-31",
        "quality_score": 0.9
      },
      {
        "id": "마쓰야마_snsSpots_754228544813_3",
        "tag": "SNS스팟",
        "title": "감성도시 다카마쓰에 빠졌습니다.",
        "subtitle": "안녕하세요 미니멀라스트 입니다. 이번 설 연휴에 다카마쓰를 다녀왔습니다 사실…",
        "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
        "place_name": null,
        "place_confidence": "none",
        "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4228544?boardtype=L&menuid=813",
        "date": "2026-02-24",
        "quality_score": 0.9
      }
    ]
  }
};

const BY_CONCEPT_DATA: Record<string, Record<string, ExploreResult>> = {
  "오사카": {
    "식도락": {
      "itinerary": [
        {
          "id": "오사카_itinerary_224318024698_0",
          "tag": "추천일정",
          "title": "26년 6월의 일상 02",
          "subtitle": "떠나자 일본으로 연애시절에는 스케줄 맞추기가 쉽지않아서 오빠랑 해외여행을 가…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/com_5153/224318024698",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_itinerary_754301267204_1",
          "tag": "추천일정",
          "title": "초행으로 후쿠오카를 가시는 분들에게 후쿠오카정리 기본편 (공항이동,시내이동,숙소)",
          "subtitle": "제가 평소에 후쿠오카에 대해 주저리주저리 아는척을 많이 했는데 도움이 될런지…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4301267?boardtype=L&menuid=204",
          "date": "2026-05-30",
          "quality_score": 0.9
        },
        {
          "id": "오사카_itinerary_224318025326_2",
          "tag": "추천일정",
          "title": "돼지력 뽐내는 오사카 3박 4일 여행 일정 1일차 (찐맛집 공유",
          "subtitle": "DAY1 웰리나 신사이바시 나고미 - 도톤보리 - 토미타규카츠 - 잇신도 -…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/flypig_g/224318025326",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_itinerary_754283591204_3",
          "tag": "추천일정",
          "title": "[알펜루트 혼여-2탄] 4.24.~29. / 오사카-교토-도야마-무로도(1박)- 나고야",
          "subtitle": "4.28. 무로도 - 나고야 무로도의 밤 무로도에서 환상적이었던 기억을 뒤로…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4283591?boardtype=L&menuid=204",
          "date": "2026-05-05",
          "quality_score": 0.9
        }
      ],
      "lodging": [
        {
          "id": "오사카_lodging_754205711204_0",
          "tag": "숙소",
          "title": "오사카 우메다 힐튼 다녀왔어요! 강추해요!!!",
          "subtitle": "오늘 귀국했어요. 오사카는 2번째인데 이번엔 아이와 함께 3인 가족으로 왔네…",
          "image": "https://images.unsplash.com/photo-1737382428408-b8d84d2cf44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUElQjAlRUIlQTklOTQlRUIlOEIlQTQlMjAlRUQlOUUlOTAlRUQlOEElQkMlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2MXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "우메다 힐튼",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4205711?boardtype=L&menuid=204",
          "date": "2026-02-02",
          "quality_score": 0.9
        },
        {
          "id": "오사카_lodging_224316536831_1",
          "tag": "숙소",
          "title": "오사카 7살 아이랑 호텔유니버셜포트 / 유니버셜에서",
          "subtitle": "아이와 유니버셜 가보고 느낀점은 가까운게 최고다 오픈런과 발바닥 아픔 이슈에…",
          "image": "https://images.unsplash.com/photo-1732522158761-6dbc6266e47f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwNnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/sssy325/224316536831",
          "date": "2026-06-15",
          "quality_score": 0.9
        },
        {
          "id": "오사카_lodging_224319267482_2",
          "tag": "숙소",
          "title": "오사카 가족여행 야마토야 혼텐 료칸 재패니즈 리버뷰룸 조식",
          "subtitle": "사랑하는 가족과 함께 떠나는 오사카 여행은 생각만 해도 설레는 일이 될거에요…",
          "image": "https://images.unsplash.com/photo-1713970943504-04e8a3e3abac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOTUlQkMlRUIlQTclODglRUQlODYlQTAlRUMlOTUlQkMlMjAlRUQlOTglQkMlRUQlODUlOTAlMjAlRUIlQTMlOEMlRUMlQjklQjglMjAlRUMlOUUlQUMlRUQlOEMlQTglRUIlOEIlODglRUMlQTYlODglMjAlRUIlQTYlQUMlRUIlQjIlODQlRUIlQjclQjAlRUIlQTMlQjglMjAlRUMlQTElQjAlRUMlOEIlOUQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2Mnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "야마토야 혼텐 료칸 재패니즈 리버뷰룸 조식",
          "place_confidence": "low",
          "link": "https://blog.naver.com/lkhs9149/224319267482",
          "date": "2026-06-18",
          "quality_score": 0.9
        },
        {
          "id": "오사카_lodging_224318129473_3",
          "tag": "숙소",
          "title": "일본 오사카 숙소 추천 컴포트호텔 신사이바시 조식",
          "subtitle": "일본 오사카 숙소 추천 컴포트호텔 신사이바시 조식 이번 일본 오사카 3박4일…",
          "image": "https://images.unsplash.com/photo-1771056700883-a3f5146497fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUQlQkMlRUIlQjMlQjglMjAlRUMlODglOTklRUMlODYlOEMlMjAlRUMlQkIlQjQlRUQlOEYlQUMlRUQlOEElQjglRUQlOTglQjglRUQlODUlOTQlMjAlRUMlOEIlQTAlRUMlODIlQUMlRUMlOUQlQjQlRUIlQjAlOTQlRUMlOEIlOUMlMjAlRUMlQTElQjAlRUMlOEIlOUQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2M3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "일본 숙소 컴포트호텔 신사이바시 조식",
          "place_confidence": "low",
          "link": "https://blog.naver.com/franrom/224318129473",
          "date": "2026-06-16",
          "quality_score": 0.9
        }
      ],
      "restaurants": [
        {
          "id": "오사카_restaurants_224318008052_0",
          "tag": "맛집",
          "title": "일본 여행 34일차",
          "subtitle": "일본 여행 3일차 아침 ️ 오늘도 어김없이 아침은 전날 마트에서 사 두었던…",
          "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/ma3323/224318008052",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_restaurants_224318033771_1",
          "tag": "맛집",
          "title": "오사카 스키야키 맛집 추천 역대급 A5등급 와규 쿠시카츠",
          "subtitle": "오사카 스키야키 쿠시카츠 하루나 혼마치점 Sukiyaki Kushikatsu…",
          "image": "https://images.unsplash.com/photo-1699154016198-dd89c2da4ffd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOEElQTQlRUQlODIlQTQlRUMlOTUlQkMlRUQlODIlQTQlMjAlRUIlQTclOUIlRUMlQTclOTElMjAlRUMlOTclQUQlRUIlOEMlODAlRUElQjglODklMjBBNSVFQiU5MyVCMSVFQSVCOCU4OSUyMCVFQyU5OSU4MCVFQSVCNyU5QyUyMCVFQyVCRiVBMCVFQyU4QiU5QyVFQyVCOSVCNCVFQyVCOCVBMCUyME9zYWthJTIwSmFwYW58ZW58MHx8fHwxNzgyNTQxNjYzfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "스키야키 맛집 역대급 A5등급 와규 쿠시카츠",
          "place_confidence": "low",
          "link": "https://blog.naver.com/11sec/224318033771",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_restaurants_224318057174_2",
          "tag": "맛집",
          "title": "후기 ｜도톤보리보다 훨씬 웨이팅 적은 일본 라멘 맛집",
          "subtitle": "안녕하세요 미미언니입니다 오사카 여행 중 이치란라멘은 꼭 먹으려고 계획하였었…",
          "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/mimiz3z/224318057174",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_restaurants_224318071860_3",
          "tag": "맛집",
          "title": "후구쿠지라in도톤보리(오사카.Japan)",
          "subtitle": "복어를 좋아한다면 추천 2022. 12. 09 착한 가이드님이 저녁에 자유시…",
          "image": "https://images.unsplash.com/photo-1596240748549-6ec0f32d4c95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOUIlODQlRUElQjUlQUMlRUMlQkYlQTAlRUMlQTclODAlRUIlOUQlQkNpbiVFQiU4RiU4NCVFRCU4NiVBNCVFQiVCMyVCNCVFQiVBNiVBQyUyOC5KYXBhbiUyOSUyME9zYWthJTIwSmFwYW58ZW58MHx8fHwxNzgyNTQxNjY0fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "후구쿠지라in도톤보리(.Japan)",
          "place_confidence": "low",
          "link": "https://blog.naver.com/bluedog0611/224318071860",
          "date": "2026-06-16",
          "quality_score": 0.9
        }
      ],
      "snsSpots": [
        {
          "id": "오사카_snsSpots_224303160107_0",
          "tag": "SNS스팟",
          "title": "2026 오사카 유니버셜 스튜디오 닌텐도월드 완벽 정리 여름",
          "subtitle": "2026년 여름, 게임 속으로 떠나는 여행 안녕하세요 2026년 최신 여행…",
          "image": "https://images.unsplash.com/photo-1737382428408-b8d84d2cf44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlMjAlRUMlOEElQTQlRUQlOEElOUMlRUIlOTQlOTQlRUMlOTglQTQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2NXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "유니버셜 스튜디오",
          "place_confidence": "low",
          "link": "https://blog.naver.com/tiger266/224303160107",
          "date": "2026-06-17",
          "quality_score": 0.9
        },
        {
          "id": "오사카_snsSpots_224318127107_1",
          "tag": "SNS스팟",
          "title": "오사카 유니버셜 후기 | 익스프레스 없이 일반 입장권으로",
          "subtitle": "오사카 여행에서 절대 빼놓을 수 없는 코스가 바로 유니버셜 스튜디오 재팬(U…",
          "image": "https://images.unsplash.com/photo-1603638710460-f20107e4ed47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2Nnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "유니버셜",
          "place_confidence": "low",
          "link": "https://blog.naver.com/bellak1104/224318127107",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_snsSpots_224318116667_2",
          "tag": "SNS스팟",
          "title": "USJ 유니버셜 스튜디오 재팬 7월 말 초성수기 입장권 정리",
          "subtitle": "방학의 시작과 아들 생일에 맞춰 오사카 유니버셜 재팬 일정을 짜고 있어요-…",
          "image": "https://images.unsplash.com/photo-1737382428408-b8d84d2cf44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxVU0olMjAlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlMjAlRUMlOEElQTQlRUQlOEElOUMlRUIlOTQlOTQlRUMlOTglQTQlMjAlRUMlOUUlQUMlRUQlOEMlQUMlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2N3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "USJ 유니버셜 스튜디오 재팬",
          "place_confidence": "low",
          "link": "https://blog.naver.com/gjdodud/224318116667",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_snsSpots_224318026526_3",
          "tag": "SNS스팟",
          "title": "아이와 오사카 가족여행, 4박5일, 비오는날 유니버셜스튜디오",
          "subtitle": "아이와 오사카 가족여행 4박5일, 2일차 비오는날 유니버셜스튜디오 이용후기…",
          "image": "https://images.unsplash.com/photo-1603638710460-f20107e4ed47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlRUMlOEElQTQlRUQlOEElOUMlRUIlOTQlOTQlRUMlOTglQTQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2OHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "유니버셜스튜디오",
          "place_confidence": "low",
          "link": "https://blog.naver.com/sosoharu1129/224318026526",
          "date": "2026-06-16",
          "quality_score": 0.9
        }
      ]
    },
    "힐링": {
      "itinerary": [
        {
          "id": "오사카_itinerary_224318024698_0",
          "tag": "추천일정",
          "title": "26년 6월의 일상 02",
          "subtitle": "떠나자 일본으로 연애시절에는 스케줄 맞추기가 쉽지않아서 오빠랑 해외여행을 가…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/com_5153/224318024698",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_itinerary_224318025326_1",
          "tag": "추천일정",
          "title": "돼지력 뽐내는 오사카 3박 4일 여행 일정 1일차 (찐맛집 공유",
          "subtitle": "DAY1 웰리나 신사이바시 나고미 - 도톤보리 - 토미타규카츠 - 잇신도 -…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/flypig_g/224318025326",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_itinerary_754283591204_2",
          "tag": "추천일정",
          "title": "[알펜루트 혼여-2탄] 4.24.~29. / 오사카-교토-도야마-무로도(1박)- 나고야",
          "subtitle": "4.28. 무로도 - 나고야 무로도의 밤 무로도에서 환상적이었던 기억을 뒤로…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4283591?boardtype=L&menuid=204",
          "date": "2026-05-05",
          "quality_score": 0.9
        },
        {
          "id": "오사카_itinerary_754282909204_3",
          "tag": "추천일정",
          "title": "[알펜루트 혼여-1탄] 4.24.~29. / 오사카-교토-도야마-무로도(1박)-나고야",
          "subtitle": "안녕하세요. 인터넷에 떠돌고 있던 무로도 눈의 계곡 사진을 보고 한 눈에 반…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4282909?boardtype=L&menuid=204",
          "date": "2026-05-04",
          "quality_score": 0.9
        }
      ],
      "lodging": [
        {
          "id": "오사카_lodging_754205711204_0",
          "tag": "숙소",
          "title": "오사카 우메다 힐튼 다녀왔어요! 강추해요!!!",
          "subtitle": "오늘 귀국했어요. 오사카는 2번째인데 이번엔 아이와 함께 3인 가족으로 왔네…",
          "image": "https://images.unsplash.com/photo-1737382428408-b8d84d2cf44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUElQjAlRUIlQTklOTQlRUIlOEIlQTQlMjAlRUQlOUUlOTAlRUQlOEElQkMlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2MXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "우메다 힐튼",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4205711?boardtype=L&menuid=204",
          "date": "2026-02-02",
          "quality_score": 0.9
        },
        {
          "id": "오사카_lodging_224319267482_1",
          "tag": "숙소",
          "title": "오사카 가족여행 야마토야 혼텐 료칸 재패니즈 리버뷰룸 조식",
          "subtitle": "사랑하는 가족과 함께 떠나는 오사카 여행은 생각만 해도 설레는 일이 될거에요…",
          "image": "https://images.unsplash.com/photo-1713970943504-04e8a3e3abac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOTUlQkMlRUIlQTclODglRUQlODYlQTAlRUMlOTUlQkMlMjAlRUQlOTglQkMlRUQlODUlOTAlMjAlRUIlQTMlOEMlRUMlQjklQjglMjAlRUMlOUUlQUMlRUQlOEMlQTglRUIlOEIlODglRUMlQTYlODglMjAlRUIlQTYlQUMlRUIlQjIlODQlRUIlQjclQjAlRUIlQTMlQjglMjAlRUMlQTElQjAlRUMlOEIlOUQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2Mnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "야마토야 혼텐 료칸 재패니즈 리버뷰룸 조식",
          "place_confidence": "low",
          "link": "https://blog.naver.com/lkhs9149/224319267482",
          "date": "2026-06-18",
          "quality_score": 0.9
        },
        {
          "id": "오사카_lodging_224316904122_2",
          "tag": "숙소",
          "title": "오사카 유니버셜근처호텔 케이한 유니버셜타워 스탠다드룸",
          "subtitle": "안녕하세요 크리스탈 입니당 오늘은 다시 오사카 후기로 돌아와서 3박4일 일정…",
          "image": "https://images.unsplash.com/photo-1732522158761-6dbc6266e47f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwNnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "유니버셜근처호텔 케이한 유니버셜타워 스탠다드룸",
          "place_confidence": "low",
          "link": "https://blog.naver.com/monthday/224316904122",
          "date": "2026-06-15",
          "quality_score": 0.9
        },
        {
          "id": "오사카_lodging_224316841610_3",
          "tag": "숙소",
          "title": "호텔케이한유니버셜타워 쿼드러플룸(낮은침대)숙박",
          "subtitle": "오사카 여행 첫날 간사이공항에서 리무진을 타고 캐리어 끌고 바로 가이유칸 수…",
          "image": "https://images.unsplash.com/photo-1732522158761-6dbc6266e47f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwNnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "호텔케이한유니버셜타워 쿼드러플룸(낮은침대)숙박",
          "place_confidence": "low",
          "link": "https://blog.naver.com/lolsunnylol7/224316841610",
          "date": "2026-06-15",
          "quality_score": 0.9
        }
      ],
      "restaurants": [
        {
          "id": "오사카_restaurants_224318008052_0",
          "tag": "맛집",
          "title": "일본 여행 34일차",
          "subtitle": "일본 여행 3일차 아침 ️ 오늘도 어김없이 아침은 전날 마트에서 사 두었던…",
          "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/ma3323/224318008052",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_restaurants_224318033771_1",
          "tag": "맛집",
          "title": "오사카 스키야키 맛집 추천 역대급 A5등급 와규 쿠시카츠",
          "subtitle": "오사카 스키야키 쿠시카츠 하루나 혼마치점 Sukiyaki Kushikatsu…",
          "image": "https://images.unsplash.com/photo-1699154016198-dd89c2da4ffd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOEElQTQlRUQlODIlQTQlRUMlOTUlQkMlRUQlODIlQTQlMjAlRUIlQTclOUIlRUMlQTclOTElMjAlRUMlOTclQUQlRUIlOEMlODAlRUElQjglODklMjBBNSVFQiU5MyVCMSVFQSVCOCU4OSUyMCVFQyU5OSU4MCVFQSVCNyU5QyUyMCVFQyVCRiVBMCVFQyU4QiU5QyVFQyVCOSVCNCVFQyVCOCVBMCUyME9zYWthJTIwSmFwYW58ZW58MHx8fHwxNzgyNTQxNjYzfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "스키야키 맛집 역대급 A5등급 와규 쿠시카츠",
          "place_confidence": "low",
          "link": "https://blog.naver.com/11sec/224318033771",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_restaurants_224318034981_2",
          "tag": "맛집",
          "title": "일본 오사카 덴카차야역 츠케멘 현지인 맛집 추천",
          "subtitle": "つけ麺 まるぶし 츠케멘마루부시 내돈내산 오사카 찐 츠케멘 맛집 찾는다면 여기…",
          "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "일본 덴카차야역 츠케멘 현지인 맛집",
          "place_confidence": "low",
          "link": "https://blog.naver.com/sennis99/224318034981",
          "date": "2026-06-17",
          "quality_score": 0.9
        },
        {
          "id": "오사카_restaurants_224309625684_3",
          "tag": "맛집",
          "title": "오사카 맛집 함박 스테이크 동양정 우메다 한큐점 웨이팅",
          "subtitle": "안녕하시와요. 오늘은 일본 가서 매번 먹어보고는 싶었지만 일정이 되지 않아…",
          "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/rkatk1155/224309625684",
          "date": "2026-06-17",
          "quality_score": 0.9
        }
      ],
      "snsSpots": [
        {
          "id": "오사카_snsSpots_224303160107_0",
          "tag": "SNS스팟",
          "title": "2026 오사카 유니버셜 스튜디오 닌텐도월드 완벽 정리 여름",
          "subtitle": "2026년 여름, 게임 속으로 떠나는 여행 안녕하세요 2026년 최신 여행…",
          "image": "https://images.unsplash.com/photo-1737382428408-b8d84d2cf44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlMjAlRUMlOEElQTQlRUQlOEElOUMlRUIlOTQlOTQlRUMlOTglQTQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2NXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "유니버셜 스튜디오",
          "place_confidence": "low",
          "link": "https://blog.naver.com/tiger266/224303160107",
          "date": "2026-06-17",
          "quality_score": 0.9
        },
        {
          "id": "오사카_snsSpots_224318127107_1",
          "tag": "SNS스팟",
          "title": "오사카 유니버셜 후기 | 익스프레스 없이 일반 입장권으로",
          "subtitle": "오사카 여행에서 절대 빼놓을 수 없는 코스가 바로 유니버셜 스튜디오 재팬(U…",
          "image": "https://images.unsplash.com/photo-1603638710460-f20107e4ed47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2Nnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "유니버셜",
          "place_confidence": "low",
          "link": "https://blog.naver.com/bellak1104/224318127107",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_snsSpots_224317974323_2",
          "tag": "SNS스팟",
          "title": "오사카 유니버셜 입장시간 타임라인, 오픈런 없는 현실적인 동선",
          "subtitle": "유니버셜 스튜디오 재팬 무리하지 않고 다녀오는 현실적인 동선 및 시간 타임라…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIwN3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/cbseven7/224317974323",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_snsSpots_224317940570_3",
          "tag": "SNS스팟",
          "title": "LA 여행 테마파크 디즈니랜드 vs 유니버셜 스튜디오 어디가",
          "subtitle": "LA 자유여행 준비하면서 가장 고민했던 일정 중 하나가 바로 디즈니랜드를 갈…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIwN3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/sorority_/224317940570",
          "date": "2026-06-16",
          "quality_score": 0.9
        }
      ]
    },
    "핫플": {
      "itinerary": [
        {
          "id": "오사카_itinerary_224318024698_0",
          "tag": "추천일정",
          "title": "26년 6월의 일상 02",
          "subtitle": "떠나자 일본으로 연애시절에는 스케줄 맞추기가 쉽지않아서 오빠랑 해외여행을 가…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/com_5153/224318024698",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_itinerary_224318025326_1",
          "tag": "추천일정",
          "title": "돼지력 뽐내는 오사카 3박 4일 여행 일정 1일차 (찐맛집 공유",
          "subtitle": "DAY1 웰리나 신사이바시 나고미 - 도톤보리 - 토미타규카츠 - 잇신도 -…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/flypig_g/224318025326",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_itinerary_754283591204_2",
          "tag": "추천일정",
          "title": "[알펜루트 혼여-2탄] 4.24.~29. / 오사카-교토-도야마-무로도(1박)- 나고야",
          "subtitle": "4.28. 무로도 - 나고야 무로도의 밤 무로도에서 환상적이었던 기억을 뒤로…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4283591?boardtype=L&menuid=204",
          "date": "2026-05-05",
          "quality_score": 0.9
        },
        {
          "id": "오사카_itinerary_754282909204_3",
          "tag": "추천일정",
          "title": "[알펜루트 혼여-1탄] 4.24.~29. / 오사카-교토-도야마-무로도(1박)-나고야",
          "subtitle": "안녕하세요. 인터넷에 떠돌고 있던 무로도 눈의 계곡 사진을 보고 한 눈에 반…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4282909?boardtype=L&menuid=204",
          "date": "2026-05-04",
          "quality_score": 0.9
        }
      ],
      "lodging": [
        {
          "id": "오사카_lodging_754205711204_0",
          "tag": "숙소",
          "title": "오사카 우메다 힐튼 다녀왔어요! 강추해요!!!",
          "subtitle": "오늘 귀국했어요. 오사카는 2번째인데 이번엔 아이와 함께 3인 가족으로 왔네…",
          "image": "https://images.unsplash.com/photo-1737382428408-b8d84d2cf44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUElQjAlRUIlQTklOTQlRUIlOEIlQTQlMjAlRUQlOUUlOTAlRUQlOEElQkMlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2MXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "우메다 힐튼",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4205711?boardtype=L&menuid=204",
          "date": "2026-02-02",
          "quality_score": 0.9
        },
        {
          "id": "오사카_lodging_224316536831_1",
          "tag": "숙소",
          "title": "오사카 7살 아이랑 호텔유니버셜포트 / 유니버셜에서",
          "subtitle": "아이와 유니버셜 가보고 느낀점은 가까운게 최고다 오픈런과 발바닥 아픔 이슈에…",
          "image": "https://images.unsplash.com/photo-1732522158761-6dbc6266e47f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwNnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/sssy325/224316536831",
          "date": "2026-06-15",
          "quality_score": 0.9
        },
        {
          "id": "오사카_lodging_224319267482_2",
          "tag": "숙소",
          "title": "오사카 가족여행 야마토야 혼텐 료칸 재패니즈 리버뷰룸 조식",
          "subtitle": "사랑하는 가족과 함께 떠나는 오사카 여행은 생각만 해도 설레는 일이 될거에요…",
          "image": "https://images.unsplash.com/photo-1713970943504-04e8a3e3abac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOTUlQkMlRUIlQTclODglRUQlODYlQTAlRUMlOTUlQkMlMjAlRUQlOTglQkMlRUQlODUlOTAlMjAlRUIlQTMlOEMlRUMlQjklQjglMjAlRUMlOUUlQUMlRUQlOEMlQTglRUIlOEIlODglRUMlQTYlODglMjAlRUIlQTYlQUMlRUIlQjIlODQlRUIlQjclQjAlRUIlQTMlQjglMjAlRUMlQTElQjAlRUMlOEIlOUQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2Mnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "야마토야 혼텐 료칸 재패니즈 리버뷰룸 조식",
          "place_confidence": "low",
          "link": "https://blog.naver.com/lkhs9149/224319267482",
          "date": "2026-06-18",
          "quality_score": 0.9
        },
        {
          "id": "오사카_lodging_224318129473_3",
          "tag": "숙소",
          "title": "일본 오사카 숙소 추천 컴포트호텔 신사이바시 조식",
          "subtitle": "일본 오사카 숙소 추천 컴포트호텔 신사이바시 조식 이번 일본 오사카 3박4일…",
          "image": "https://images.unsplash.com/photo-1771056700883-a3f5146497fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUQlQkMlRUIlQjMlQjglMjAlRUMlODglOTklRUMlODYlOEMlMjAlRUMlQkIlQjQlRUQlOEYlQUMlRUQlOEElQjglRUQlOTglQjglRUQlODUlOTQlMjAlRUMlOEIlQTAlRUMlODIlQUMlRUMlOUQlQjQlRUIlQjAlOTQlRUMlOEIlOUMlMjAlRUMlQTElQjAlRUMlOEIlOUQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2M3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "일본 숙소 컴포트호텔 신사이바시 조식",
          "place_confidence": "low",
          "link": "https://blog.naver.com/franrom/224318129473",
          "date": "2026-06-16",
          "quality_score": 0.9
        }
      ],
      "restaurants": [
        {
          "id": "오사카_restaurants_224318008052_0",
          "tag": "맛집",
          "title": "일본 여행 34일차",
          "subtitle": "일본 여행 3일차 아침 ️ 오늘도 어김없이 아침은 전날 마트에서 사 두었던…",
          "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/ma3323/224318008052",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_restaurants_224318071860_1",
          "tag": "맛집",
          "title": "후구쿠지라in도톤보리(오사카.Japan)",
          "subtitle": "복어를 좋아한다면 추천 2022. 12. 09 착한 가이드님이 저녁에 자유시…",
          "image": "https://images.unsplash.com/photo-1596240748549-6ec0f32d4c95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOUIlODQlRUElQjUlQUMlRUMlQkYlQTAlRUMlQTclODAlRUIlOUQlQkNpbiVFQiU4RiU4NCVFRCU4NiVBNCVFQiVCMyVCNCVFQiVBNiVBQyUyOC5KYXBhbiUyOSUyME9zYWthJTIwSmFwYW58ZW58MHx8fHwxNzgyNTQxNjY0fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "후구쿠지라in도톤보리(.Japan)",
          "place_confidence": "low",
          "link": "https://blog.naver.com/bluedog0611/224318071860",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_restaurants_224318158091_2",
          "tag": "맛집",
          "title": "오사카 도톤보리 맛집 스테이크진 난바점 와규 스테이크",
          "subtitle": "오사카 도톤보리 맛집 스테이크진 난바점 와규 스테이크 오마카세 코스 오사카…",
          "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "도톤보리 맛집 스테이크진 난바점 와규 스테이크",
          "place_confidence": "low",
          "link": "https://blog.naver.com/hello_trip_/224318158091",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_restaurants_224318202969_3",
          "tag": "맛집",
          "title": "오사카 난바 현지인 야키니쿠 맛집, 실패 없는 ‘토라니츠노",
          "subtitle": "OSAKA TRAVEL GUIDE 현지인도 줄 서는 야키니쿠 맛집 우라난바…",
          "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/chamsae8893/224318202969",
          "date": "2026-06-17",
          "quality_score": 0.9
        }
      ],
      "snsSpots": [
        {
          "id": "오사카_snsSpots_224318026526_0",
          "tag": "SNS스팟",
          "title": "아이와 오사카 가족여행, 4박5일, 비오는날 유니버셜스튜디오",
          "subtitle": "아이와 오사카 가족여행 4박5일, 2일차 비오는날 유니버셜스튜디오 이용후기…",
          "image": "https://images.unsplash.com/photo-1603638710460-f20107e4ed47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlRUMlOEElQTQlRUQlOEElOUMlRUIlOTQlOTQlRUMlOTglQTQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2OHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "유니버셜스튜디오",
          "place_confidence": "low",
          "link": "https://blog.naver.com/sosoharu1129/224318026526",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_snsSpots_224317940570_1",
          "tag": "SNS스팟",
          "title": "LA 여행 테마파크 디즈니랜드 vs 유니버셜 스튜디오 어디가",
          "subtitle": "LA 자유여행 준비하면서 가장 고민했던 일정 중 하나가 바로 디즈니랜드를 갈…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIwN3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/sorority_/224317940570",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_snsSpots_224318740927_2",
          "tag": "SNS스팟",
          "title": "오타쿠의 오사카 여행기 2_두근두근 유니버셜 스튜디오",
          "subtitle": "거친 이른 아침입니다. 전 날 휘몰아치는 쇼핑 이슈로 결국 새벽 두시 넘어서…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIwN3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "오타쿠의 기 2_두근두근 유니버셜 스튜디오",
          "place_confidence": "low",
          "link": "https://blog.naver.com/qkr4371/224318740927",
          "date": "2026-06-17",
          "quality_score": 0.9
        },
        {
          "id": "오사카_snsSpots_224318614175_3",
          "tag": "SNS스팟",
          "title": "유니버셜 스튜디오 재팬 7살 아이가 탈 수 있는 놀이기구",
          "subtitle": "이번 오사카 여행에서 가장 기대했던 일정은 역시나 유니버셜 스튜디오 재팬(U…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIwN3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/caroll4574/224318614175",
          "date": "2026-06-17",
          "quality_score": 0.9
        }
      ]
    },
    "액티비티": {
      "itinerary": [
        {
          "id": "오사카_itinerary_754301267204_0",
          "tag": "추천일정",
          "title": "초행으로 후쿠오카를 가시는 분들에게 후쿠오카정리 기본편 (공항이동,시내이동,숙소)",
          "subtitle": "제가 평소에 후쿠오카에 대해 주저리주저리 아는척을 많이 했는데 도움이 될런지…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4301267?boardtype=L&menuid=204",
          "date": "2026-05-30",
          "quality_score": 0.9
        },
        {
          "id": "오사카_itinerary_754254276204_1",
          "tag": "추천일정",
          "title": "나고야 4박 5일 2인 숙소, 일정, 경비",
          "subtitle": "다녀온 정보 공유합니다. 동경 출장은 자주 갔지만 일본 여행은 두번째이고,…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "나고야 4박 5일 2인 숙소 일정 경비",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4254276?boardtype=L&menuid=204",
          "date": "2026-03-29",
          "quality_score": 0.9
        },
        {
          "id": "오사카_itinerary_754218629204_2",
          "tag": "추천일정",
          "title": "후쿠오카 10살아들과 단둘이 첫여행이에요!(2)",
          "subtitle": "역시나 또 긴글입니다 처음글보다 엄청 굉장히 많이 깁니다. 저흰 어제 귀국했…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "후쿠오카 10살아들과 단 첫이에요 (2)",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4218629?boardtype=L&menuid=204",
          "date": "2026-02-13",
          "quality_score": 0.9
        },
        {
          "id": "오사카_itinerary_754164055204_3",
          "tag": "추천일정",
          "title": "오사카, 해외여행이 처음이라면? 간단 꿀팁",
          "subtitle": "올해 여름 첫 해외여행으로 오사카 가보고 느낀 점입니다 1. 항공권 1 스카…",
          "image": "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwNXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "해외이 처음이라면 간단 꿀팁",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4164055?boardtype=L&menuid=204",
          "date": "2025-12-24",
          "quality_score": 0.9
        }
      ],
      "lodging": [
        {
          "id": "오사카_lodging_224316536831_0",
          "tag": "숙소",
          "title": "오사카 7살 아이랑 호텔유니버셜포트 / 유니버셜에서",
          "subtitle": "아이와 유니버셜 가보고 느낀점은 가까운게 최고다 오픈런과 발바닥 아픔 이슈에…",
          "image": "https://images.unsplash.com/photo-1732522158761-6dbc6266e47f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwNnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/sssy325/224316536831",
          "date": "2026-06-15",
          "quality_score": 0.9
        },
        {
          "id": "오사카_lodging_224319267482_1",
          "tag": "숙소",
          "title": "오사카 가족여행 야마토야 혼텐 료칸 재패니즈 리버뷰룸 조식",
          "subtitle": "사랑하는 가족과 함께 떠나는 오사카 여행은 생각만 해도 설레는 일이 될거에요…",
          "image": "https://images.unsplash.com/photo-1713970943504-04e8a3e3abac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOTUlQkMlRUIlQTclODglRUQlODYlQTAlRUMlOTUlQkMlMjAlRUQlOTglQkMlRUQlODUlOTAlMjAlRUIlQTMlOEMlRUMlQjklQjglMjAlRUMlOUUlQUMlRUQlOEMlQTglRUIlOEIlODglRUMlQTYlODglMjAlRUIlQTYlQUMlRUIlQjIlODQlRUIlQjclQjAlRUIlQTMlQjglMjAlRUMlQTElQjAlRUMlOEIlOUQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2Mnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "야마토야 혼텐 료칸 재패니즈 리버뷰룸 조식",
          "place_confidence": "low",
          "link": "https://blog.naver.com/lkhs9149/224319267482",
          "date": "2026-06-18",
          "quality_score": 0.9
        },
        {
          "id": "오사카_lodging_224316904122_2",
          "tag": "숙소",
          "title": "오사카 유니버셜근처호텔 케이한 유니버셜타워 스탠다드룸",
          "subtitle": "안녕하세요 크리스탈 입니당 오늘은 다시 오사카 후기로 돌아와서 3박4일 일정…",
          "image": "https://images.unsplash.com/photo-1732522158761-6dbc6266e47f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwNnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "유니버셜근처호텔 케이한 유니버셜타워 스탠다드룸",
          "place_confidence": "low",
          "link": "https://blog.naver.com/monthday/224316904122",
          "date": "2026-06-15",
          "quality_score": 0.9
        },
        {
          "id": "오사카_lodging_224316841610_3",
          "tag": "숙소",
          "title": "호텔케이한유니버셜타워 쿼드러플룸(낮은침대)숙박",
          "subtitle": "오사카 여행 첫날 간사이공항에서 리무진을 타고 캐리어 끌고 바로 가이유칸 수…",
          "image": "https://images.unsplash.com/photo-1732522158761-6dbc6266e47f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwNnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "호텔케이한유니버셜타워 쿼드러플룸(낮은침대)숙박",
          "place_confidence": "low",
          "link": "https://blog.naver.com/lolsunnylol7/224316841610",
          "date": "2026-06-15",
          "quality_score": 0.9
        }
      ],
      "restaurants": [
        {
          "id": "오사카_restaurants_224318008052_0",
          "tag": "맛집",
          "title": "일본 여행 34일차",
          "subtitle": "일본 여행 3일차 아침 ️ 오늘도 어김없이 아침은 전날 마트에서 사 두었던…",
          "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/ma3323/224318008052",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_restaurants_224317864018_1",
          "tag": "맛집",
          "title": "일본여행 번외 |이치란라멘 ,쿠쿠루타코야끼",
          "subtitle": "오늘은 일본여행 시리즈중 번외 이치란 라멘, 쿠쿠루타코야끼 후기입니다 교토투…",
          "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "일본 번외 이치란라멘 쿠쿠루타코야끼",
          "place_confidence": "low",
          "link": "https://blog.naver.com/hyunji6445/224317864018",
          "date": "2026-06-17",
          "quality_score": 0.9
        },
        {
          "id": "오사카_restaurants_224319167864_2",
          "tag": "맛집",
          "title": "[오사카 맛집 추천] 오사카에서 든든하고 가성비 좋은 일본",
          "subtitle": "여행가면 조식도 잘 나오지만 어쩐지 일본 가정식을 먹고 싶을 떄가 있음 일본…",
          "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "에서 든든하고 가성비 좋은 일본",
          "place_confidence": "low",
          "link": "https://blog.naver.com/keepitcalm/224319167864",
          "date": "2026-06-17",
          "quality_score": 0.9
        },
        {
          "id": "오사카_restaurants_224316735332_3",
          "tag": "맛집",
          "title": "오사카 난바 라멘 맛집 준도야 메뉴 및 솔직 후기",
          "subtitle": "이치란 웨이팅 지쳤다면 준도야 라멘 난바에비수하시점 추천 일본왔으니 라멘은…",
          "image": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjA3fDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "난바 라멘 맛집 준도야 메뉴 및 솔직",
          "place_confidence": "low",
          "link": "https://blog.naver.com/jsjh0817/224316735332",
          "date": "2026-06-15",
          "quality_score": 0.9
        }
      ],
      "snsSpots": [
        {
          "id": "오사카_snsSpots_224303160107_0",
          "tag": "SNS스팟",
          "title": "2026 오사카 유니버셜 스튜디오 닌텐도월드 완벽 정리 여름",
          "subtitle": "2026년 여름, 게임 속으로 떠나는 여행 안녕하세요 2026년 최신 여행…",
          "image": "https://images.unsplash.com/photo-1737382428408-b8d84d2cf44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlMjAlRUMlOEElQTQlRUQlOEElOUMlRUIlOTQlOTQlRUMlOTglQTQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2NXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "유니버셜 스튜디오",
          "place_confidence": "low",
          "link": "https://blog.naver.com/tiger266/224303160107",
          "date": "2026-06-17",
          "quality_score": 0.9
        },
        {
          "id": "오사카_snsSpots_224318127107_1",
          "tag": "SNS스팟",
          "title": "오사카 유니버셜 후기 | 익스프레스 없이 일반 입장권으로",
          "subtitle": "오사카 여행에서 절대 빼놓을 수 없는 코스가 바로 유니버셜 스튜디오 재팬(U…",
          "image": "https://images.unsplash.com/photo-1603638710460-f20107e4ed47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2Nnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "유니버셜",
          "place_confidence": "low",
          "link": "https://blog.naver.com/bellak1104/224318127107",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_snsSpots_224318116667_2",
          "tag": "SNS스팟",
          "title": "USJ 유니버셜 스튜디오 재팬 7월 말 초성수기 입장권 정리",
          "subtitle": "방학의 시작과 아들 생일에 맞춰 오사카 유니버셜 재팬 일정을 짜고 있어요-…",
          "image": "https://images.unsplash.com/photo-1737382428408-b8d84d2cf44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxVU0olMjAlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlMjAlRUMlOEElQTQlRUQlOEElOUMlRUIlOTQlOTQlRUMlOTglQTQlMjAlRUMlOUUlQUMlRUQlOEMlQUMlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2N3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "USJ 유니버셜 스튜디오 재팬",
          "place_confidence": "low",
          "link": "https://blog.naver.com/gjdodud/224318116667",
          "date": "2026-06-16",
          "quality_score": 0.9
        },
        {
          "id": "오사카_snsSpots_224318026526_3",
          "tag": "SNS스팟",
          "title": "아이와 오사카 가족여행, 4박5일, 비오는날 유니버셜스튜디오",
          "subtitle": "아이와 오사카 가족여행 4박5일, 2일차 비오는날 유니버셜스튜디오 이용후기…",
          "image": "https://images.unsplash.com/photo-1603638710460-f20107e4ed47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOUMlQTAlRUIlOEIlODglRUIlQjIlODQlRUMlODUlOUMlRUMlOEElQTQlRUQlOEElOUMlRUIlOTQlOTQlRUMlOTglQTQlMjBPc2FrYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY2OHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "유니버셜스튜디오",
          "place_confidence": "low",
          "link": "https://blog.naver.com/sosoharu1129/224318026526",
          "date": "2026-06-16",
          "quality_score": 0.9
        }
      ]
    }
  },
  "시즈오카": {
    "식도락": {
      "itinerary": [
        {
          "id": "시즈오카_itinerary_224309230714_0",
          "tag": "추천일정",
          "title": "시즈오카 여행 Day1 - 후지노미야역 고리키군버스 오후 투어",
          "subtitle": "260530박 4일 ꒰՞⸝⸝ʚ̴̶̷̷ · ʚ̴̶̷̷⸝⸝՞꒱ 휴직, 그 시작…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/hollyrj/224309230714",
          "date": "2026-06-08",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_itinerary_754285157204_1",
          "tag": "추천일정",
          "title": "후지노미야에서 가와구치코로 넘어가는 버스시간",
          "subtitle": "안녕하세요 골든위크에 아타미에서 3일 보내고 시즈오카와서 자고 오늘아침에 j…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "후지노미야에서 가와구치코로 넘어가는 버스시간",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4285157?boardtype=L&menuid=204",
          "date": "2026-05-07",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_itinerary_754143155204_2",
          "tag": "추천일정",
          "title": "일본 전국일주 완료를 기념하며 올리는글 (경현치 47개도도부현 여행사진) 사진많음주의",
          "subtitle": "안녕하세요 올해 5월 2주간의 시코쿠일주여행을 완료하며 십몇년간의 일본전국일…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4143155?boardtype=L&menuid=204",
          "date": "2025-12-01",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_itinerary_754310585813_3",
          "tag": "추천일정",
          "title": "작년 여름에 갔던 나고야 요약",
          "subtitle": "AI 동영상으로 요약본입니다. 실제로는 25년 여름 휴가때 첫 해외여행을 나…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4310585?boardtype=L&menuid=813",
          "date": "2026-06-12",
          "quality_score": 0.9
        }
      ],
      "lodging": [
        {
          "id": "시즈오카_lodging_542023991002_0",
          "tag": "숙소",
          "title": "코트야드 바이 메리어트 나고야(コートヤード・バイ・マリオット名古屋) THE LOUNGE(더 라운지) シャンパンジャーニー(샴팡무제한 애프터눈티)",
          "subtitle": "네이버 카페 대한민국 모임의 시작, 네이버 카페 naver.me ※. 202…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4202399?boardtype=L&menuid=1002",
          "date": "2026-01-29",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_lodging_754268741993_1",
          "tag": "숙소",
          "title": "[나고야] 호텔 아크리시 도요하시(ホテルアークリッシュ豊橋) 스탠다드 더블룸(STANDARD DOUBLE) 조식",
          "subtitle": "나고야 1박2일 입니다. 나고야는 총 30회차 이상 여행을 오고 있는데요.…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4268741?boardtype=L&menuid=993",
          "date": "2026-04-16",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_lodging_754252698993_2",
          "tag": "숙소",
          "title": "시즈오카 시즈테츠 호텔 프레지오 시즈오카 에키난",
          "subtitle": "1. 숙박업소명 (등급) : 시즈오카 시즈테츠 호텔 프레지오 시즈오카 에키난…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "시즈오카 시즈테츠 호텔 프레지오 시즈오카 에키난",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4252698?boardtype=L&menuid=993",
          "date": "2026-03-27",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_lodging_754226163993_3",
          "tag": "숙소",
          "title": "누마즈 헤다항 - 우미 노 호텔 이사바 (海のほてるいさば)",
          "subtitle": "1. 숙박업소명 (등급) : 우미 노 호텔 이사바 (海のほてるいさば) (4성…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "우미 노 호텔 이사바",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4226163?boardtype=L&menuid=993",
          "date": "2026-02-22",
          "quality_score": 0.9
        }
      ],
      "restaurants": [
        {
          "id": "시즈오카_restaurants_542840601002_0",
          "tag": "맛집",
          "title": "키르훼봉 이제 단골하겠어요~~",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 키르훼봉 3. 지역 : 나고야…",
          "image": "https://images.unsplash.com/photo-1653047016706-89e86e55a092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlODIlQTQlRUIlQTUlQjQlRUQlOUIlQkMlRUIlQjQlODklMjBTaGl6dW9rYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY3Mnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "키르훼봉",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4284060?boardtype=L&menuid=1002",
          "date": "2026-05-06",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_restaurants_542000351002_1",
          "tag": "맛집",
          "title": "아타미 펄스타 호텔(熱海パールスターホテル) 라운지 오션 브리즈(ラウンジ オーシャンブリーズ) いちごと桜のアフタヌーンティ(딸기와 벚꽃 애프터눈티)",
          "subtitle": "3박4일 시즈오카 왕복 1일차 입니다. 아타미에서 열리는 애프터눈티를 발견하…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4200035?boardtype=L&menuid=1002",
          "date": "2026-01-27",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_restaurants_542059271002_2",
          "tag": "맛집",
          "title": "미야코호텔 욧카이치(都ホテル 四日市) PARMIERE(パルミエール) ストロベリー＆ショコラ アフタヌーンティ―(딸기초코 애프터눈티)",
          "subtitle": "3박4일 시즈오카왕복 3일차 나고야에서 숙박후 미에현으로 갑니다. 미에현의…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4205927?boardtype=L&menuid=1002",
          "date": "2026-02-02",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_restaurants_542066641002_3",
          "tag": "맛집",
          "title": "호텔 아소시아 시즈오카(ホテルアソシア静岡) 파고라(パーゴラ) 静岡マルシェ冬の季節を味わうディナーブッフェ(디너뷔페 애프터눈티)",
          "subtitle": "3박4일 3일차 저녁은 아이치현 나고야에서 조식을 하고, 미에현 욧카이치에서…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4206664?boardtype=L&menuid=1002",
          "date": "2026-02-02",
          "quality_score": 0.9
        }
      ],
      "snsSpots": [
        {
          "id": "시즈오카_snsSpots_224308891134_0",
          "tag": "SNS스팟",
          "title": "[시즈오카 4박 5일] 3일차 꿈의 대교, 시즈오카역, 시미즈역",
          "subtitle": "후모톳바라의 새벽은 어마무시했다. 바람소리에 잠을 이룰 수 없을 정도로 비바…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/jjleee_/224308891134",
          "date": "2026-06-07",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_snsSpots_224309442587_1",
          "tag": "SNS스팟",
          "title": "일본 소도시 감성 제대로였던 4월 시즈오카여행 후기｜후지산",
          "subtitle": "안녕하시렵니까? 노언더스탠드, 박슐랭입니다. 4월 초에 일본 시즈오카 여행을…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "일본 소도시 감성 제대로였던 4월 ｜후지산",
          "place_confidence": "low",
          "link": "https://blog.naver.com/nounderstanding/224309442587",
          "date": "2026-06-08",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_snsSpots_754285789204_2",
          "tag": "SNS스팟",
          "title": "후지역에서 후지산 훑어보기(아이와함께)",
          "subtitle": "버스투어예약이 다 차버려서 예약은 못하고 뚜벅이로 다녀와야겠다 생각하고 찾아…",
          "image": "https://images.unsplash.com/photo-1715051631750-047f75186af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOUIlODQlRUMlQTclODAlRUMlOTclQUQlRUMlOTclOTAlRUMlODQlOUMlMjAlRUQlOUIlODQlRUMlQTclODAlRUMlODIlQjAlMjAlRUQlOUIlOTElRUMlOTYlQjQlRUIlQjMlQjQlRUElQjglQjAlMjglRUQlOTUlQTglRUElQkIlOTglMjklMjBTaGl6dW9rYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY3M3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "후지역에서 후지산 훑어보기(함께)",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4285789?boardtype=L&menuid=204",
          "date": "2026-05-08",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_snsSpots_754248242204_3",
          "tag": "SNS스팟",
          "title": "알펜루트에 대해서 자세히 알려드릴게요 알펜루트는 어디에 있고 무엇을 말하는지, 웹티켓, 패스, 코스, 볼거리등 알펜루트에 대한 자세한 설명 ( 정보글이라 장문입니다)",
          "subtitle": "안녕하세요 장문의 정보글 깔끔입니다 요즘 카페에 들어오면 질문글에 알펜루트에…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4248242?boardtype=L&menuid=204",
          "date": "2026-03-22",
          "quality_score": 0.9
        }
      ]
    },
    "힐링": {
      "itinerary": [
        {
          "id": "시즈오카_itinerary_224309230714_0",
          "tag": "추천일정",
          "title": "시즈오카 여행 Day1 - 후지노미야역 고리키군버스 오후 투어",
          "subtitle": "260530박 4일 ꒰՞⸝⸝ʚ̴̶̷̷ · ʚ̴̶̷̷⸝⸝՞꒱ 휴직, 그 시작…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/hollyrj/224309230714",
          "date": "2026-06-08",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_itinerary_754285157204_1",
          "tag": "추천일정",
          "title": "후지노미야에서 가와구치코로 넘어가는 버스시간",
          "subtitle": "안녕하세요 골든위크에 아타미에서 3일 보내고 시즈오카와서 자고 오늘아침에 j…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "후지노미야에서 가와구치코로 넘어가는 버스시간",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4285157?boardtype=L&menuid=204",
          "date": "2026-05-07",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_itinerary_754143155204_2",
          "tag": "추천일정",
          "title": "일본 전국일주 완료를 기념하며 올리는글 (경현치 47개도도부현 여행사진) 사진많음주의",
          "subtitle": "안녕하세요 올해 5월 2주간의 시코쿠일주여행을 완료하며 십몇년간의 일본전국일…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4143155?boardtype=L&menuid=204",
          "date": "2025-12-01",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_itinerary_754298180813_3",
          "tag": "추천일정",
          "title": "도쿄숙박비가 비싸 도쿄근교로 도는 7박8일 도쿄여행기 지만 오늘은 시즈오카현 여향2일차 (누마즈항구, 아타미 Moa미술관, 라비스타 아타미 숙박, 아타미밤풍경)",
          "subtitle": "안녕하세요 오늘은 여행 5일차입니다 예보상 여행기간중 오늘이 가장 날씨가 좋…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4298180?boardtype=L&menuid=813",
          "date": "2026-05-25",
          "quality_score": 0.9
        }
      ],
      "lodging": [
        {
          "id": "시즈오카_lodging_754264272204_0",
          "tag": "숙소",
          "title": "시티오 시즈오카호텔",
          "subtitle": "5박6일 일정에서 4박은 시즈오카역 부근 선팰리스호텔에서 숙박을 했고, 마지…",
          "image": "https://images.unsplash.com/photo-1744549112545-714103faaf49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOEIlOUMlRUQlOEIlQjAlRUMlOTglQTQlMjAlRUQlOTglQjglRUQlODUlOTQlMjBTaGl6dW9rYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY3MHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "시티오 호텔",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4264272?boardtype=L&menuid=204",
          "date": "2026-04-11",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_lodging_754226163993_1",
          "tag": "숙소",
          "title": "누마즈 헤다항 - 우미 노 호텔 이사바 (海のほてるいさば)",
          "subtitle": "1. 숙박업소명 (등급) : 우미 노 호텔 이사바 (海のほてるいさば) (4성…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "우미 노 호텔 이사바",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4226163?boardtype=L&menuid=993",
          "date": "2026-02-22",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_lodging_754225417993_2",
          "tag": "숙소",
          "title": "아카자와 온천 호텔 (赤沢温泉ホテル) - 본관 최상층 오션뷰 화양실",
          "subtitle": "1. 숙박업소명 (등급) : 아카자와 온천 호텔 (赤沢温泉ホテル) 2. 위치…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "아카자와 온천 호텔",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4225417?boardtype=L&menuid=993",
          "date": "2026-02-21",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_lodging_754221335993_3",
          "tag": "숙소",
          "title": "호텔 아소시아 시즈오카",
          "subtitle": "1. 숙박업소명 (등급) : 호텔 아소시아 시즈오카 /4성급 2. 위치 또는…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "호텔 아소시아 시즈오카 /4성급",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4221335?boardtype=L&menuid=993",
          "date": "2026-02-16",
          "quality_score": 0.9
        }
      ],
      "restaurants": [
        {
          "id": "시즈오카_restaurants_542059271002_0",
          "tag": "맛집",
          "title": "미야코호텔 욧카이치(都ホテル 四日市) PARMIERE(パルミエール) ストロベリー＆ショコラ アフタヌーンティ―(딸기초코 애프터눈티)",
          "subtitle": "3박4일 시즈오카왕복 3일차 나고야에서 숙박후 미에현으로 갑니다. 미에현의…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4205927?boardtype=L&menuid=1002",
          "date": "2026-02-02",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_restaurants_542066641002_1",
          "tag": "맛집",
          "title": "호텔 아소시아 시즈오카(ホテルアソシア静岡) 파고라(パーゴラ) 静岡マルシェ冬の季節を味わうディナーブッフェ(디너뷔페 애프터눈티)",
          "subtitle": "3박4일 3일차 저녁은 아이치현 나고야에서 조식을 하고, 미에현 욧카이치에서…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4206664?boardtype=L&menuid=1002",
          "date": "2026-02-02",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_restaurants_542078891002_2",
          "tag": "맛집",
          "title": "후지산 미시마 도큐 호텔(富士山三島東急ホテル) 炉 L’EAU アフタヌーンティーセット(애프터눈티 세트)",
          "subtitle": "3박4일 시즈오카왕복 마지막일정은 미시마역과 딱붙어 있는 후지산 미시마 도큐…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4207889?boardtype=L&menuid=1002",
          "date": "2026-02-03",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_restaurants_224313273482_3",
          "tag": "맛집",
          "title": "하코네에서 하루를 2 (하코네 시계방향으로 가보기)",
          "subtitle": "하코네 신사에서 시간을 많이 보냈더니 점심시간이 훌쩍 지났다. 출출해진 배를…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/chanzzang2/224313273482",
          "date": "2026-06-15",
          "quality_score": 0.9
        }
      ],
      "snsSpots": [
        {
          "id": "시즈오카_snsSpots_224308891134_0",
          "tag": "SNS스팟",
          "title": "[시즈오카 4박 5일] 3일차 꿈의 대교, 시즈오카역, 시미즈역",
          "subtitle": "후모톳바라의 새벽은 어마무시했다. 바람소리에 잠을 이룰 수 없을 정도로 비바…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/jjleee_/224308891134",
          "date": "2026-06-07",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_snsSpots_224309442587_1",
          "tag": "SNS스팟",
          "title": "일본 소도시 감성 제대로였던 4월 시즈오카여행 후기｜후지산",
          "subtitle": "안녕하시렵니까? 노언더스탠드, 박슐랭입니다. 4월 초에 일본 시즈오카 여행을…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "일본 소도시 감성 제대로였던 4월 ｜후지산",
          "place_confidence": "low",
          "link": "https://blog.naver.com/nounderstanding/224309442587",
          "date": "2026-06-08",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_snsSpots_754248242204_2",
          "tag": "SNS스팟",
          "title": "알펜루트에 대해서 자세히 알려드릴게요 알펜루트는 어디에 있고 무엇을 말하는지, 웹티켓, 패스, 코스, 볼거리등 알펜루트에 대한 자세한 설명 ( 정보글이라 장문입니다)",
          "subtitle": "안녕하세요 장문의 정보글 깔끔입니다 요즘 카페에 들어오면 질문글에 알펜루트에…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4248242?boardtype=L&menuid=204",
          "date": "2026-03-22",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_snsSpots_754230681204_3",
          "tag": "SNS스팟",
          "title": "[문화행사소식]2026 시즈오카 아타미 불꽃축제 일정",
          "subtitle": "안녕하세요. 바람계곡의 나우시카입니다. 2026년 아타미 해상 불꽃축제 일정…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "아타미 불꽃축제 일정",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4230681?boardtype=L&menuid=204",
          "date": "2026-02-27",
          "quality_score": 0.9
        }
      ]
    },
    "핫플": {
      "itinerary": [
        {
          "id": "시즈오카_itinerary_224309230714_0",
          "tag": "추천일정",
          "title": "시즈오카 여행 Day1 - 후지노미야역 고리키군버스 오후 투어",
          "subtitle": "260530박 4일 ꒰՞⸝⸝ʚ̴̶̷̷ · ʚ̴̶̷̷⸝⸝՞꒱ 휴직, 그 시작…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/hollyrj/224309230714",
          "date": "2026-06-08",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_itinerary_754143155204_1",
          "tag": "추천일정",
          "title": "일본 전국일주 완료를 기념하며 올리는글 (경현치 47개도도부현 여행사진) 사진많음주의",
          "subtitle": "안녕하세요 올해 5월 2주간의 시코쿠일주여행을 완료하며 십몇년간의 일본전국일…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4143155?boardtype=L&menuid=204",
          "date": "2025-12-01",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_itinerary_754298180813_2",
          "tag": "추천일정",
          "title": "도쿄숙박비가 비싸 도쿄근교로 도는 7박8일 도쿄여행기 지만 오늘은 시즈오카현 여향2일차 (누마즈항구, 아타미 Moa미술관, 라비스타 아타미 숙박, 아타미밤풍경)",
          "subtitle": "안녕하세요 오늘은 여행 5일차입니다 예보상 여행기간중 오늘이 가장 날씨가 좋…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4298180?boardtype=L&menuid=813",
          "date": "2026-05-25",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_itinerary_754293971813_3",
          "tag": "추천일정",
          "title": "AI를 활용한, 그러나 사기는 아닌, 후지가와구치코, 이즈, 시즈오카 5월 렌트카 여행기. 데이터 주의",
          "subtitle": "부산출발은 없어지기 전에 다녀와야합니다. 언제 없어질지 모를 첫 시즈오카 후…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4293971?boardtype=L&menuid=813",
          "date": "2026-05-19",
          "quality_score": 0.9
        }
      ],
      "lodging": [
        {
          "id": "시즈오카_lodging_754264272204_0",
          "tag": "숙소",
          "title": "시티오 시즈오카호텔",
          "subtitle": "5박6일 일정에서 4박은 시즈오카역 부근 선팰리스호텔에서 숙박을 했고, 마지…",
          "image": "https://images.unsplash.com/photo-1744549112545-714103faaf49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOEIlOUMlRUQlOEIlQjAlRUMlOTglQTQlMjAlRUQlOTglQjglRUQlODUlOTQlMjBTaGl6dW9rYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY3MHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "시티오 호텔",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4264272?boardtype=L&menuid=204",
          "date": "2026-04-11",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_lodging_542023991002_1",
          "tag": "숙소",
          "title": "코트야드 바이 메리어트 나고야(コートヤード・バイ・マリオット名古屋) THE LOUNGE(더 라운지) シャンパンジャーニー(샴팡무제한 애프터눈티)",
          "subtitle": "네이버 카페 대한민국 모임의 시작, 네이버 카페 naver.me ※. 202…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4202399?boardtype=L&menuid=1002",
          "date": "2026-01-29",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_lodging_754268741993_2",
          "tag": "숙소",
          "title": "[나고야] 호텔 아크리시 도요하시(ホテルアークリッシュ豊橋) 스탠다드 더블룸(STANDARD DOUBLE) 조식",
          "subtitle": "나고야 1박2일 입니다. 나고야는 총 30회차 이상 여행을 오고 있는데요.…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4268741?boardtype=L&menuid=993",
          "date": "2026-04-16",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_lodging_754226163993_3",
          "tag": "숙소",
          "title": "누마즈 헤다항 - 우미 노 호텔 이사바 (海のほてるいさば)",
          "subtitle": "1. 숙박업소명 (등급) : 우미 노 호텔 이사바 (海のほてるいさば) (4성…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "우미 노 호텔 이사바",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4226163?boardtype=L&menuid=993",
          "date": "2026-02-22",
          "quality_score": 0.9
        }
      ],
      "restaurants": [
        {
          "id": "시즈오카_restaurants_542840601002_0",
          "tag": "맛집",
          "title": "키르훼봉 이제 단골하겠어요~~",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 키르훼봉 3. 지역 : 나고야…",
          "image": "https://images.unsplash.com/photo-1653047016706-89e86e55a092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlODIlQTQlRUIlQTUlQjQlRUQlOUIlQkMlRUIlQjQlODklMjBTaGl6dW9rYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY3Mnww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "키르훼봉",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4284060?boardtype=L&menuid=1002",
          "date": "2026-05-06",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_restaurants_542000351002_1",
          "tag": "맛집",
          "title": "아타미 펄스타 호텔(熱海パールスターホテル) 라운지 오션 브리즈(ラウンジ オーシャンブリーズ) いちごと桜のアフタヌーンティ(딸기와 벚꽃 애프터눈티)",
          "subtitle": "3박4일 시즈오카 왕복 1일차 입니다. 아타미에서 열리는 애프터눈티를 발견하…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4200035?boardtype=L&menuid=1002",
          "date": "2026-01-27",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_restaurants_542059271002_2",
          "tag": "맛집",
          "title": "미야코호텔 욧카이치(都ホテル 四日市) PARMIERE(パルミエール) ストロベリー＆ショコラ アフタヌーンティ―(딸기초코 애프터눈티)",
          "subtitle": "3박4일 시즈오카왕복 3일차 나고야에서 숙박후 미에현으로 갑니다. 미에현의…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4205927?boardtype=L&menuid=1002",
          "date": "2026-02-02",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_restaurants_542078891002_3",
          "tag": "맛집",
          "title": "후지산 미시마 도큐 호텔(富士山三島東急ホテル) 炉 L’EAU アフタヌーンティーセット(애프터눈티 세트)",
          "subtitle": "3박4일 시즈오카왕복 마지막일정은 미시마역과 딱붙어 있는 후지산 미시마 도큐…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4207889?boardtype=L&menuid=1002",
          "date": "2026-02-03",
          "quality_score": 0.9
        }
      ],
      "snsSpots": [
        {
          "id": "시즈오카_snsSpots_224308891134_0",
          "tag": "SNS스팟",
          "title": "[시즈오카 4박 5일] 3일차 꿈의 대교, 시즈오카역, 시미즈역",
          "subtitle": "후모톳바라의 새벽은 어마무시했다. 바람소리에 잠을 이룰 수 없을 정도로 비바…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/jjleee_/224308891134",
          "date": "2026-06-07",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_snsSpots_224309442587_1",
          "tag": "SNS스팟",
          "title": "일본 소도시 감성 제대로였던 4월 시즈오카여행 후기｜후지산",
          "subtitle": "안녕하시렵니까? 노언더스탠드, 박슐랭입니다. 4월 초에 일본 시즈오카 여행을…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "일본 소도시 감성 제대로였던 4월 ｜후지산",
          "place_confidence": "low",
          "link": "https://blog.naver.com/nounderstanding/224309442587",
          "date": "2026-06-08",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_snsSpots_754285789204_2",
          "tag": "SNS스팟",
          "title": "후지역에서 후지산 훑어보기(아이와함께)",
          "subtitle": "버스투어예약이 다 차버려서 예약은 못하고 뚜벅이로 다녀와야겠다 생각하고 찾아…",
          "image": "https://images.unsplash.com/photo-1715051631750-047f75186af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOUIlODQlRUMlQTclODAlRUMlOTclQUQlRUMlOTclOTAlRUMlODQlOUMlMjAlRUQlOUIlODQlRUMlQTclODAlRUMlODIlQjAlMjAlRUQlOUIlOTElRUMlOTYlQjQlRUIlQjMlQjQlRUElQjglQjAlMjglRUQlOTUlQTglRUElQkIlOTglMjklMjBTaGl6dW9rYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY3M3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "후지역에서 후지산 훑어보기(함께)",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4285789?boardtype=L&menuid=204",
          "date": "2026-05-08",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_snsSpots_754248242204_3",
          "tag": "SNS스팟",
          "title": "알펜루트에 대해서 자세히 알려드릴게요 알펜루트는 어디에 있고 무엇을 말하는지, 웹티켓, 패스, 코스, 볼거리등 알펜루트에 대한 자세한 설명 ( 정보글이라 장문입니다)",
          "subtitle": "안녕하세요 장문의 정보글 깔끔입니다 요즘 카페에 들어오면 질문글에 알펜루트에…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4248242?boardtype=L&menuid=204",
          "date": "2026-03-22",
          "quality_score": 0.9
        }
      ]
    },
    "액티비티": {
      "itinerary": [
        {
          "id": "시즈오카_itinerary_224309230714_0",
          "tag": "추천일정",
          "title": "시즈오카 여행 Day1 - 후지노미야역 고리키군버스 오후 투어",
          "subtitle": "260530박 4일 ꒰՞⸝⸝ʚ̴̶̷̷ · ʚ̴̶̷̷⸝⸝՞꒱ 휴직, 그 시작…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/hollyrj/224309230714",
          "date": "2026-06-08",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_itinerary_754293971813_1",
          "tag": "추천일정",
          "title": "AI를 활용한, 그러나 사기는 아닌, 후지가와구치코, 이즈, 시즈오카 5월 렌트카 여행기. 데이터 주의",
          "subtitle": "부산출발은 없어지기 전에 다녀와야합니다. 언제 없어질지 모를 첫 시즈오카 후…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4293971?boardtype=L&menuid=813",
          "date": "2026-05-19",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_itinerary_754290980813_2",
          "tag": "추천일정",
          "title": "5월 부모님과 시즈오카 3박4일 여행후기",
          "subtitle": "안녕하세요 시즈오카여행을 잘 마쳤습니다 부모님과 함께한 첫해외여행이라 긴장도…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "5월 부모님과 3박4일",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4290980?boardtype=L&menuid=813",
          "date": "2026-05-15",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_itinerary_224309309359_3",
          "tag": "추천일정",
          "title": "26년6월7월22일 후지산뷰 시즈오카 골프 2박3일",
          "subtitle": "안녕하세요 제이엠골프투어입니다 오늘은 후지산 뷰와 함께하는 시즈오카 골프투어…",
          "image": "https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdHJhdmVsJTIwY2l0eXNjYXBlfGVufDB8fHx8MTc4MjU0MTIwOHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "6월7월22일 후지산뷰 골프 2박3일",
          "place_confidence": "low",
          "link": "https://blog.naver.com/jaeman25/224309309359",
          "date": "2026-06-08",
          "quality_score": 0.9
        }
      ],
      "lodging": [
        {
          "id": "시즈오카_lodging_540643291002_0",
          "tag": "숙소",
          "title": "[일본여행 7] 소도시 시즈오카현(이즈반도, 미시마시) 여행 4일차_미시마 도큐호텔 후기 및 주변 마트(이온몰) 쇼핑→시즈오카 공항 렌터카 반납 및 정통 일식집 식사 & 에필로그",
          "subtitle": "시리즈의 마지막 여행기입니다. 시즈오카현 주변 도시 여행을 하실 분들에게 도…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4064329?boardtype=L&menuid=1002",
          "date": "2025-09-05",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_lodging_754294851993_1",
          "tag": "숙소",
          "title": "호텔 그랜드 후지",
          "subtitle": "1. 숙박업소명 (등급) : 4 2. 위치 또는 지역 : 시즈오카 3. 역과…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "호텔 그랜드 후지",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4294851?boardtype=L&menuid=993",
          "date": "2026-05-20",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_lodging_754203563993_2",
          "tag": "숙소",
          "title": "코트야드 바이 메리어트 나고야(コートヤード・バイ・マリオット名古屋) 디럭스 킹룸(DELUXE KING) 조식",
          "subtitle": "네이버 카페 대한민국 모임의 시작, 네이버 카페 naver.me ※. 이 호…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4203563?boardtype=L&menuid=993",
          "date": "2026-01-30",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_lodging_754224012813_3",
          "tag": "숙소",
          "title": "시즈오카 3인가족여행중 마지막밤.",
          "subtitle": "마지막은 야이즈에 있는 reort 라는데서 슥박했습니다. 이름대로 포트 옆에…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc4MjU0MTIwOXww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "3인중 마지막밤.",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4224012?boardtype=L&menuid=813",
          "date": "2026-02-19",
          "quality_score": 0.9
        }
      ],
      "restaurants": [
        {
          "id": "시즈오카_restaurants_224301355315_0",
          "tag": "맛집",
          "title": "시즈오카 렌터카 여행 15일차 - 갓 잡은 생선회를 맛볼 수 있는",
          "subtitle": "1월 27일 화요일 시미즈 어시장 가시노이치 이치바관 149,일본 Shimi…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/sagiri03/224301355315",
          "date": "2026-06-04",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_restaurants_224315691712_1",
          "tag": "맛집",
          "title": "[시즈오카 맛집] '츠케 나폴리탄' 원조 커피숍 아도니스(アドニス)",
          "subtitle": "오늘은 후지산의 기운을 듬뿍 느낄 수 있는 도시, 후지시(富士市)의 로컬 맛…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/goshizuoka/224315691712",
          "date": "2026-06-14",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_restaurants_224318987778_2",
          "tag": "맛집",
          "title": "[일본 여행] 시즈오카 가성비 스시 맛집 | 주차장 넓고 쾌적한",
          "subtitle": "안녕하세요 캐시에요. 여행 첫날이 아직 끝나지 않았어요. 저녁도 못 먹었다고…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "가성비 스시 맛집 주차장 넓고 쾌적한",
          "place_confidence": "low",
          "link": "https://blog.naver.com/cathy55/224318987778",
          "date": "2026-06-17",
          "quality_score": 0.8
        },
        {
          "id": "시즈오카_restaurants_224256639422_3",
          "tag": "맛집",
          "title": "누마즈항 & 해산물 맛집(마루텐 미시마점) - 沼津港 & 魚河岸",
          "subtitle": "드라이빙 항구 안녕하세요 이제는 봄을 지나 날씨가 더워지는게 느껴지네요. 미…",
          "image": "https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8fHwxNzgyNTQxMjEwfDA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/asiaice/224256639422",
          "date": "2026-04-18",
          "quality_score": 0.8
        }
      ],
      "snsSpots": [
        {
          "id": "시즈오카_snsSpots_754285789204_0",
          "tag": "SNS스팟",
          "title": "후지역에서 후지산 훑어보기(아이와함께)",
          "subtitle": "버스투어예약이 다 차버려서 예약은 못하고 뚜벅이로 다녀와야겠다 생각하고 찾아…",
          "image": "https://images.unsplash.com/photo-1715051631750-047f75186af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOUIlODQlRUMlQTclODAlRUMlOTclQUQlRUMlOTclOTAlRUMlODQlOUMlMjAlRUQlOUIlODQlRUMlQTclODAlRUMlODIlQjAlMjAlRUQlOUIlOTElRUMlOTYlQjQlRUIlQjMlQjQlRUElQjglQjAlMjglRUQlOTUlQTglRUElQkIlOTglMjklMjBTaGl6dW9rYSUyMEphcGFufGVufDB8fHx8MTc4MjU0MTY3M3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "후지역에서 후지산 훑어보기(함께)",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4285789?boardtype=L&menuid=204",
          "date": "2026-05-08",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_snsSpots_754297715813_1",
          "tag": "SNS스팟",
          "title": "시즈오카 총망라, 한번에 못끝낸 그 뒷편..",
          "subtitle": "네이버 카페 대한민국 모임의 시작, 네이버 카페 naver.me 1편에서 이…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "총망라 한번에 못끝낸 그 뒷편..",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4297715?boardtype=L&menuid=813",
          "date": "2026-05-25",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_snsSpots_754230681204_2",
          "tag": "SNS스팟",
          "title": "[문화행사소식]2026 시즈오카 아타미 불꽃축제 일정",
          "subtitle": "안녕하세요. 바람계곡의 나우시카입니다. 2026년 아타미 해상 불꽃축제 일정…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "아타미 불꽃축제 일정",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4230681?boardtype=L&menuid=204",
          "date": "2026-02-27",
          "quality_score": 0.9
        },
        {
          "id": "시즈오카_snsSpots_754179288204_3",
          "tag": "SNS스팟",
          "title": "시즈오카 미취학 자녀와 함께하는 정보 공유",
          "subtitle": "후지 사파리 파크 Fuji Safari Park · 4.31(11125) 字…",
          "image": "https://images.unsplash.com/photo-1708794758859-85abcf318584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxTaGl6dW9rYSUyMEphcGFuJTIwdG91cmlzdCUyMGxhbmRtYXJrfGVufDB8fHx8MTc4MjU0MTIxMHww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "미취학 자녀와 함께하는 정보 공유",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4179288?boardtype=L&menuid=204",
          "date": "2026-01-10",
          "quality_score": 0.9
        }
      ]
    }
  },
  "마쓰야마": {
    "식도락": {
      "itinerary": [
        {
          "id": "마쓰야마_itinerary_224303625319_0",
          "tag": "추천일정",
          "title": "일본 마쓰야마 여행 준비와 추천 일정 가이드",
          "subtitle": "일본 소도시 여행의 매력을 찾는 분들이라면 마쓰야마를 주목해 볼 필요가 있습…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/onebitepark/224303625319",
          "date": "2026-06-02",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_itinerary_754302972813_1",
          "tag": "추천일정",
          "title": "마쓰야마 다카마쓰 쿠라시키 이마바리",
          "subtitle": "마쓰야마 5시쯤 도착 5시30분 렌트해서 밥부터 먹고 도고온천 갔습니다. 별…",
          "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUIlOEIlQTQlRUMlQjklQjQlRUIlQTclODglRUMlOTMlQjAlMjAlRUMlQkYlQTAlRUIlOUQlQkMlRUMlOEIlOUMlRUQlODIlQTQlMjAlRUMlOUQlQjQlRUIlQTclODglRUIlQjAlOTQlRUIlQTYlQUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2NzV8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "다카마쓰 쿠라시키 이마바리",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4302972?boardtype=L&menuid=813",
          "date": "2026-06-01",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_itinerary_754301306813_2",
          "tag": "추천일정",
          "title": "아빠랑 다녀온 마쓰야마 후기 1일차",
          "subtitle": "우동과 초밥을 좋아하는 아빠가 제가 일본을 갈때마다 부러워하시며 질투하셨는데…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4301306?boardtype=L&menuid=813",
          "date": "2026-05-30",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_itinerary_754298172813_3",
          "tag": "추천일정",
          "title": "가족과 함께 4박 5일 마쓰야마 여행 후기 (장문 주의)",
          "subtitle": "일본 여행은 이번이 3번째 입니다. (오사카, 나고야 다녀옴) 오사카는 아들…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "가족과 함께 4박 5일",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4298172?boardtype=L&menuid=813",
          "date": "2026-05-25",
          "quality_score": 0.9
        }
      ],
      "lodging": [
        {
          "id": "마쓰야마_lodging_224297881539_0",
          "tag": "숙소",
          "title": "[26년 5월] 마쓰야마 여행. 둘째날",
          "subtitle": "마쓰야마 여행 둘째날. 짜잔 칸데오 호텔 조식. 일어나자마자 온천 원모타임…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/dadada1206/224297881539",
          "date": "2026-05-27",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_lodging_754297757993_1",
          "tag": "숙소",
          "title": "마쓰야마 가성비 호텔, 체크인 마쓰야마",
          "subtitle": "1. 숙박업소명 (등급) : 호텔 체크 인 마쓰야마 2. 위치 또는 지역 :…",
          "image": "https://images.unsplash.com/photo-1743511789084-dd239c460b5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOTglQjglRUQlODUlOTQlMjAlRUMlQjIlQjQlRUQlODElQUMlMjAlRUMlOUQlQjglMjAlRUIlQTclODglRUMlOTMlQjAlRUMlOTUlQkMlRUIlQTclODglMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2Nzh8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "호텔 체크 인 마쓰야마",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4297757?boardtype=L&menuid=993",
          "date": "2026-05-25",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_lodging_754270704993_2",
          "tag": "숙소",
          "title": "REF 마쓰야마 시티 스테이션 바이 베셀 호텔 (REF Matsuyama City Station by VESSEL HOTELS)",
          "subtitle": "1. 숙박업소명 (등급) : REF 마쓰야마 시티 스테이션 바이 베셀 호텔…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "REF 마쓰야마 시티 스테이션 바이 베셀 호텔",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4270704?boardtype=L&menuid=993",
          "date": "2026-04-19",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_lodging_754242085993_3",
          "tag": "숙소",
          "title": "REF 마쓰야마 시티 스테이션 by 베셀",
          "subtitle": "1. 숙박업소명 (등급) : REF 베셀 2. 위치 또는 지역 : 마쓰야마시…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "REF 베셀",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4242085?boardtype=L&menuid=993",
          "date": "2026-03-13",
          "quality_score": 0.9
        }
      ],
      "restaurants": [
        {
          "id": "마쓰야마_restaurants_543098421002_0",
          "tag": "맛집",
          "title": "마쓰야마 카페 Goodtime Stand",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 굿타임스탠드 3. 지역 : 마…",
          "image": "https://images.unsplash.com/photo-1669612803668-2b2a770f9890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUElQjUlQkYlRUQlODMlODAlRUMlOUUlODQlRUMlOEElQTQlRUQlODMlQTAlRUIlOTMlOUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2Nzl8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "굿타임스탠드",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4309842?boardtype=L&menuid=1002",
          "date": "2026-06-11",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_restaurants_540302311002_1",
          "tag": "맛집",
          "title": "마쓰야마 야키토리집에서 둘이 13만원치 먹은 후기",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 토리지로( とり次郎) 3. 지…",
          "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlODYlQTAlRUIlQTYlQUMlRUMlQTclODAlRUIlQTElOUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2ODF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "토리지로",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4030231?boardtype=L&menuid=1002",
          "date": "2025-07-24",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_restaurants_542935621002_2",
          "tag": "맛집",
          "title": "마쓰야마 찐로컬 레스토랑 노사키",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 레스토랑 노사키 3. 지역 :…",
          "image": "https://images.unsplash.com/photo-1676917350107-964194678afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUIlQTAlODglRUMlOEElQTQlRUQlODYlQTAlRUIlOUUlOTElMjAlRUIlODUlQjglRUMlODIlQUMlRUQlODIlQTQlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2ODF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "레스토랑 노사키",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4293562?boardtype=L&menuid=1002",
          "date": "2026-05-19",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_restaurants_542935381002_3",
          "tag": "맛집",
          "title": "마쓰야마 오코노미야키 텟판코보 쿠자쿠",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 텟판코보 쿠자코 3. 지역 :…",
          "image": "https://images.unsplash.com/photo-1629684782790-385ed5adb497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fHx8MTc4MjU0MTIxM3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "텟판코보 쿠자코",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4293538?boardtype=L&menuid=1002",
          "date": "2026-05-19",
          "quality_score": 0.9
        }
      ],
      "snsSpots": [
        {
          "id": "마쓰야마_snsSpots_754227369813_0",
          "tag": "SNS스팟",
          "title": "뒤뚱뒤뚱 마쓰야마 4일차 > ② 이시테지의 비밀 통로 '만트라 동굴' 속으로",
          "subtitle": "2026년 2월 2일 이시테지 본당 뒤편, 입을 벌리고 있는 어두운 동굴이…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4227369?boardtype=L&menuid=813",
          "date": "2026-02-23",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_snsSpots_224298785986_1",
          "tag": "SNS스팟",
          "title": "마쓰야마 렌터카 근교여행 일본의 스위스 텐구고원과 시코쿠",
          "subtitle": "마쓰야마 렌터카여행의 마지막 코스이자 하이라이트, 일본의 스위스라고 불리는…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "렌터카 근교 일본의 스위스 텐구고원과 시코쿠",
          "place_confidence": "low",
          "link": "https://blog.naver.com/everybean/224298785986",
          "date": "2026-05-28",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_snsSpots_754228544813_2",
          "tag": "SNS스팟",
          "title": "감성도시 다카마쓰에 빠졌습니다.",
          "subtitle": "안녕하세요 미니멀라스트 입니다. 이번 설 연휴에 다카마쓰를 다녀왔습니다 사실…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4228544?boardtype=L&menuid=813",
          "date": "2026-02-24",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_snsSpots_754286481813_3",
          "tag": "SNS스팟",
          "title": "마쓰야마 사진 모음 Day2",
          "subtitle": "늦잠 조지고 도미밥 이거 뭔데 이렇게나 맛있지? 도미밥 먹구 스타트부터 기분…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "사진 모음 Day2",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4286481?boardtype=L&menuid=813",
          "date": "2026-05-09",
          "quality_score": 0.9
        }
      ]
    },
    "힐링": {
      "itinerary": [
        {
          "id": "마쓰야마_itinerary_224303625319_0",
          "tag": "추천일정",
          "title": "일본 마쓰야마 여행 준비와 추천 일정 가이드",
          "subtitle": "일본 소도시 여행의 매력을 찾는 분들이라면 마쓰야마를 주목해 볼 필요가 있습…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/onebitepark/224303625319",
          "date": "2026-06-02",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_itinerary_754302972813_1",
          "tag": "추천일정",
          "title": "마쓰야마 다카마쓰 쿠라시키 이마바리",
          "subtitle": "마쓰야마 5시쯤 도착 5시30분 렌트해서 밥부터 먹고 도고온천 갔습니다. 별…",
          "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUIlOEIlQTQlRUMlQjklQjQlRUIlQTclODglRUMlOTMlQjAlMjAlRUMlQkYlQTAlRUIlOUQlQkMlRUMlOEIlOUMlRUQlODIlQTQlMjAlRUMlOUQlQjQlRUIlQTclODglRUIlQjAlOTQlRUIlQTYlQUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2NzV8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "다카마쓰 쿠라시키 이마바리",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4302972?boardtype=L&menuid=813",
          "date": "2026-06-01",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_itinerary_754301306813_2",
          "tag": "추천일정",
          "title": "아빠랑 다녀온 마쓰야마 후기 1일차",
          "subtitle": "우동과 초밥을 좋아하는 아빠가 제가 일본을 갈때마다 부러워하시며 질투하셨는데…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4301306?boardtype=L&menuid=813",
          "date": "2026-05-30",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_itinerary_754298172813_3",
          "tag": "추천일정",
          "title": "가족과 함께 4박 5일 마쓰야마 여행 후기 (장문 주의)",
          "subtitle": "일본 여행은 이번이 3번째 입니다. (오사카, 나고야 다녀옴) 오사카는 아들…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "가족과 함께 4박 5일",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4298172?boardtype=L&menuid=813",
          "date": "2026-05-25",
          "quality_score": 0.9
        }
      ],
      "lodging": [
        {
          "id": "마쓰야마_lodging_224297881539_0",
          "tag": "숙소",
          "title": "[26년 5월] 마쓰야마 여행. 둘째날",
          "subtitle": "마쓰야마 여행 둘째날. 짜잔 칸데오 호텔 조식. 일어나자마자 온천 원모타임…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/dadada1206/224297881539",
          "date": "2026-05-27",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_lodging_754270704993_1",
          "tag": "숙소",
          "title": "REF 마쓰야마 시티 스테이션 바이 베셀 호텔 (REF Matsuyama City Station by VESSEL HOTELS)",
          "subtitle": "1. 숙박업소명 (등급) : REF 마쓰야마 시티 스테이션 바이 베셀 호텔…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "REF 마쓰야마 시티 스테이션 바이 베셀 호텔",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4270704?boardtype=L&menuid=993",
          "date": "2026-04-19",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_lodging_754241800993_2",
          "tag": "숙소",
          "title": "다이와 로이넷 _ 주니어 스위트 패밀리",
          "subtitle": "1. 숙박업소명 (등급) : 다이와 로이넷 2. 위치 또는 지역 : 오카이도…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "다이와 로이넷",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4241800?boardtype=L&menuid=993",
          "date": "2026-03-13",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_lodging_754218964993_3",
          "tag": "숙소",
          "title": "도미인 마쓰야마, 좋은후기가 많았으나...",
          "subtitle": "1. 숙박업소명 (등급) : 도미인미쓰야마 내츄럴핫스프링(3성급) 2. 위치…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "도미인미쓰야마 내츄럴핫스프링",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4218964?boardtype=L&menuid=993",
          "date": "2026-02-14",
          "quality_score": 0.9
        }
      ],
      "restaurants": [
        {
          "id": "마쓰야마_restaurants_543091251002_0",
          "tag": "맛집",
          "title": "마쓰야마 회전초밥 스시에몬 도고온천점",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 스시에몽 도고온천점 3. 지역…",
          "image": "https://images.unsplash.com/photo-1580355275559-10c832e123f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOEElQTQlRUMlOEIlOUMlRUMlOTclOTAlRUIlQUElQkQlMjAlRUIlOEYlODQlRUElQjMlQTAlRUMlOTglQTglRUMlQjIlOUMlRUMlQTAlOTAlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2ODB8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "스시에몽 도고온천점",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4309125?boardtype=L&menuid=1002",
          "date": "2026-06-10",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_restaurants_542428821002_1",
          "tag": "맛집",
          "title": "마쓰야마 _ 잇푸도 라멘 : 오카이도",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 잇푸도 3. 지역 : 마쓰야마…",
          "image": "https://images.unsplash.com/photo-1629684782790-385ed5adb497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fHx8MTc4MjU0MTIxM3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "잇푸도",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4242882?boardtype=L&menuid=1002",
          "date": "2026-03-15",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_restaurants_542411571002_2",
          "tag": "맛집",
          "title": "에히메의 학교 1970",
          "subtitle": "1. 내가주는 추천점수 : 3 (가성비는 별로지만 경험삼기 좋음) 2. 상점…",
          "image": "https://images.unsplash.com/photo-1629684782790-385ed5adb497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fHx8MTc4MjU0MTIxM3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "에히메의 학교 1970",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4241157?boardtype=L&menuid=1002",
          "date": "2026-03-12",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_restaurants_542314111002_3",
          "tag": "맛집",
          "title": "마쓰야마 맛집",
          "subtitle": "스시오구라 - 일본에서 먹은 카이센동 중 최고였습니다. 초밥은 거의 오마카세…",
          "image": "https://images.unsplash.com/photo-1629684782790-385ed5adb497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fHx8MTc4MjU0MTIxM3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "맛집",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4231411?boardtype=L&menuid=1002",
          "date": "2026-02-27",
          "quality_score": 0.9
        }
      ],
      "snsSpots": [
        {
          "id": "마쓰야마_snsSpots_224298785986_0",
          "tag": "SNS스팟",
          "title": "마쓰야마 렌터카 근교여행 일본의 스위스 텐구고원과 시코쿠",
          "subtitle": "마쓰야마 렌터카여행의 마지막 코스이자 하이라이트, 일본의 스위스라고 불리는…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "렌터카 근교 일본의 스위스 텐구고원과 시코쿠",
          "place_confidence": "low",
          "link": "https://blog.naver.com/everybean/224298785986",
          "date": "2026-05-28",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_snsSpots_754302099813_1",
          "tag": "SNS스팟",
          "title": "마쓰야마 히가시도고 소라토모리 온천",
          "subtitle": "3박4일로 마쓰야마 혼여 왔어요 오늘이 3일차네요. 첫날은 무료쿠폰으로 마쓰…",
          "image": "https://images.unsplash.com/photo-1549548284-28057f92c497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOUUlODglRUElQjAlODAlRUMlOEIlOUMlRUIlOEYlODQlRUElQjMlQTAlMjAlRUMlODYlOEMlRUIlOUQlQkMlRUQlODYlQTAlRUIlQUElQTglRUIlQTYlQUMlMjAlRUMlOTglQTglRUMlQjIlOUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2ODN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "히가시도고 소라토모리 온천",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4302099?boardtype=L&menuid=813",
          "date": "2026-05-31",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_snsSpots_754228544813_2",
          "tag": "SNS스팟",
          "title": "감성도시 다카마쓰에 빠졌습니다.",
          "subtitle": "안녕하세요 미니멀라스트 입니다. 이번 설 연휴에 다카마쓰를 다녀왔습니다 사실…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4228544?boardtype=L&menuid=813",
          "date": "2026-02-24",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_snsSpots_754286481813_3",
          "tag": "SNS스팟",
          "title": "마쓰야마 사진 모음 Day2",
          "subtitle": "늦잠 조지고 도미밥 이거 뭔데 이렇게나 맛있지? 도미밥 먹구 스타트부터 기분…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "사진 모음 Day2",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4286481?boardtype=L&menuid=813",
          "date": "2026-05-09",
          "quality_score": 0.9
        }
      ]
    },
    "핫플": {
      "itinerary": [
        {
          "id": "마쓰야마_itinerary_224303625319_0",
          "tag": "추천일정",
          "title": "일본 마쓰야마 여행 준비와 추천 일정 가이드",
          "subtitle": "일본 소도시 여행의 매력을 찾는 분들이라면 마쓰야마를 주목해 볼 필요가 있습…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/onebitepark/224303625319",
          "date": "2026-06-02",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_itinerary_754302972813_1",
          "tag": "추천일정",
          "title": "마쓰야마 다카마쓰 쿠라시키 이마바리",
          "subtitle": "마쓰야마 5시쯤 도착 5시30분 렌트해서 밥부터 먹고 도고온천 갔습니다. 별…",
          "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUIlOEIlQTQlRUMlQjklQjQlRUIlQTclODglRUMlOTMlQjAlMjAlRUMlQkYlQTAlRUIlOUQlQkMlRUMlOEIlOUMlRUQlODIlQTQlMjAlRUMlOUQlQjQlRUIlQTclODglRUIlQjAlOTQlRUIlQTYlQUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2NzV8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "다카마쓰 쿠라시키 이마바리",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4302972?boardtype=L&menuid=813",
          "date": "2026-06-01",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_itinerary_754301306813_2",
          "tag": "추천일정",
          "title": "아빠랑 다녀온 마쓰야마 후기 1일차",
          "subtitle": "우동과 초밥을 좋아하는 아빠가 제가 일본을 갈때마다 부러워하시며 질투하셨는데…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4301306?boardtype=L&menuid=813",
          "date": "2026-05-30",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_itinerary_754298172813_3",
          "tag": "추천일정",
          "title": "가족과 함께 4박 5일 마쓰야마 여행 후기 (장문 주의)",
          "subtitle": "일본 여행은 이번이 3번째 입니다. (오사카, 나고야 다녀옴) 오사카는 아들…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "가족과 함께 4박 5일",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4298172?boardtype=L&menuid=813",
          "date": "2026-05-25",
          "quality_score": 0.9
        }
      ],
      "lodging": [
        {
          "id": "마쓰야마_lodging_224297881539_0",
          "tag": "숙소",
          "title": "[26년 5월] 마쓰야마 여행. 둘째날",
          "subtitle": "마쓰야마 여행 둘째날. 짜잔 칸데오 호텔 조식. 일어나자마자 온천 원모타임…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/dadada1206/224297881539",
          "date": "2026-05-27",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_lodging_754303173993_1",
          "tag": "숙소",
          "title": "아나 크라운 플라자 마쓰야마",
          "subtitle": "1. 숙박업소명 (등급) : 아나 크라운 플라자 마쓰야마 (ANA Crown…",
          "image": "https://images.unsplash.com/photo-1676917350107-964194678afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUMlOTUlODQlRUIlODIlOTglMjAlRUQlODElQUMlRUIlOUQlQkMlRUMlOUElQjQlMjAlRUQlOTQlOEMlRUIlOUQlQkMlRUMlOUUlOTAlMjAlRUIlQTclODglRUMlOTMlQjAlRUMlOTUlQkMlRUIlQTclODglMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2Nzd8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "아나 크라운 플라자 마쓰야마",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4303173?boardtype=L&menuid=993",
          "date": "2026-06-01",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_lodging_754241800993_2",
          "tag": "숙소",
          "title": "다이와 로이넷 _ 주니어 스위트 패밀리",
          "subtitle": "1. 숙박업소명 (등급) : 다이와 로이넷 2. 위치 또는 지역 : 오카이도…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "다이와 로이넷",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4241800?boardtype=L&menuid=993",
          "date": "2026-03-13",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_lodging_224122153194_3",
          "tag": "숙소",
          "title": "마쓰야마 가족여행 아이랑 가기 좋은 온천 감성 숙소 추천",
          "subtitle": "안녕하세요 일본 온천 여행 좋아하시는 분들 많으시죠? 요즘 가족 단위 마쓰야…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "아이랑 가기 좋은 온천 감성 숙소",
          "place_confidence": "low",
          "link": "https://blog.naver.com/sianotes/224122153194",
          "date": "2025-12-25",
          "quality_score": 0.9
        }
      ],
      "restaurants": [
        {
          "id": "마쓰야마_restaurants_540302311002_0",
          "tag": "맛집",
          "title": "마쓰야마 야키토리집에서 둘이 13만원치 먹은 후기",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 토리지로( とり次郎) 3. 지…",
          "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlODYlQTAlRUIlQTYlQUMlRUMlQTclODAlRUIlQTElOUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2ODF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "토리지로",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4030231?boardtype=L&menuid=1002",
          "date": "2025-07-24",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_restaurants_542428821002_1",
          "tag": "맛집",
          "title": "마쓰야마 _ 잇푸도 라멘 : 오카이도",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 잇푸도 3. 지역 : 마쓰야마…",
          "image": "https://images.unsplash.com/photo-1629684782790-385ed5adb497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fHx8MTc4MjU0MTIxM3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "잇푸도",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4242882?boardtype=L&menuid=1002",
          "date": "2026-03-15",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_restaurants_542411571002_2",
          "tag": "맛집",
          "title": "에히메의 학교 1970",
          "subtitle": "1. 내가주는 추천점수 : 3 (가성비는 별로지만 경험삼기 좋음) 2. 상점…",
          "image": "https://images.unsplash.com/photo-1629684782790-385ed5adb497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fHx8MTc4MjU0MTIxM3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "에히메의 학교 1970",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4241157?boardtype=L&menuid=1002",
          "date": "2026-03-12",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_restaurants_542422601002_3",
          "tag": "맛집",
          "title": "마쓰야마 _ 츠루짱 : 도고온천 별관 앞",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 츠루짱 3. 지역 : 마쓰야마…",
          "image": "https://images.unsplash.com/photo-1629684782790-385ed5adb497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fHx8MTc4MjU0MTIxM3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "츠루짱",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4242260?boardtype=L&menuid=1002",
          "date": "2026-03-13",
          "quality_score": 0.9
        }
      ],
      "snsSpots": [
        {
          "id": "마쓰야마_snsSpots_224298785986_0",
          "tag": "SNS스팟",
          "title": "마쓰야마 렌터카 근교여행 일본의 스위스 텐구고원과 시코쿠",
          "subtitle": "마쓰야마 렌터카여행의 마지막 코스이자 하이라이트, 일본의 스위스라고 불리는…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "렌터카 근교 일본의 스위스 텐구고원과 시코쿠",
          "place_confidence": "low",
          "link": "https://blog.naver.com/everybean/224298785986",
          "date": "2026-05-28",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_snsSpots_754228544813_1",
          "tag": "SNS스팟",
          "title": "감성도시 다카마쓰에 빠졌습니다.",
          "subtitle": "안녕하세요 미니멀라스트 입니다. 이번 설 연휴에 다카마쓰를 다녀왔습니다 사실…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4228544?boardtype=L&menuid=813",
          "date": "2026-02-24",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_snsSpots_754286481813_2",
          "tag": "SNS스팟",
          "title": "마쓰야마 사진 모음 Day2",
          "subtitle": "늦잠 조지고 도미밥 이거 뭔데 이렇게나 맛있지? 도미밥 먹구 스타트부터 기분…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "사진 모음 Day2",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4286481?boardtype=L&menuid=813",
          "date": "2026-05-09",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_snsSpots_754228826813_3",
          "tag": "SNS스팟",
          "title": "뒤뚱뒤뚱 마쓰야마 5일차 > 숨은 보석같은 연인의 성지 가시마(鹿島)",
          "subtitle": "2026년 2월 3일 안녕하세요 마쓰야마 7박 8일 여행의 허리를 넘긴 5일…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4228826?boardtype=L&menuid=813",
          "date": "2026-02-25",
          "quality_score": 0.9
        }
      ]
    },
    "액티비티": {
      "itinerary": [
        {
          "id": "마쓰야마_itinerary_224303625319_0",
          "tag": "추천일정",
          "title": "일본 마쓰야마 여행 준비와 추천 일정 가이드",
          "subtitle": "일본 소도시 여행의 매력을 찾는 분들이라면 마쓰야마를 주목해 볼 필요가 있습…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/onebitepark/224303625319",
          "date": "2026-06-02",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_itinerary_754298172813_1",
          "tag": "추천일정",
          "title": "가족과 함께 4박 5일 마쓰야마 여행 후기 (장문 주의)",
          "subtitle": "일본 여행은 이번이 3번째 입니다. (오사카, 나고야 다녀옴) 오사카는 아들…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "가족과 함께 4박 5일",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4298172?boardtype=L&menuid=813",
          "date": "2026-05-25",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_itinerary_754295651813_2",
          "tag": "추천일정",
          "title": "마쓰야마는 처음이라서(둘째날)",
          "subtitle": "다이와 로이넷마쓰야마 조식을먹었어요. 저는 저렴하게 조식포함이라 갔는데 카이…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4295651?boardtype=L&menuid=813",
          "date": "2026-05-21",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_itinerary_224257544399_3",
          "tag": "추천일정",
          "title": "마쓰야마 3박4일 일정 : REF 베셀 호텔/ 오카이도/ 도고온천",
          "subtitle": "안녕하세요 히수입니다 오늘은 짝꿍이랑 떠난 3박 4일 마쓰야마 여행 코스를…",
          "image": "https://images.unsplash.com/photo-1720218853810-e0ffb5f4daa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRyYXZlbCUyMGNpdHlzY2FwZXxlbnwwfHx8fDE3ODI1NDEyMTF8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/oosiuh/224257544399",
          "date": "2026-04-20",
          "quality_score": 0.9
        }
      ],
      "lodging": [
        {
          "id": "마쓰야마_lodging_224297881539_0",
          "tag": "숙소",
          "title": "[26년 5월] 마쓰야마 여행. 둘째날",
          "subtitle": "마쓰야마 여행 둘째날. 짜잔 칸데오 호텔 조식. 일어나자마자 온천 원모타임…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/dadada1206/224297881539",
          "date": "2026-05-27",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_lodging_754192695993_1",
          "tag": "숙소",
          "title": "마쓰야마 REF베셀호텔",
          "subtitle": "1. 숙박업소명 (등급) : 마쓰야마 ref베셀호텔 2. 위치 또는 지역 :…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "마쓰야마 ref베셀호텔",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4192695?boardtype=L&menuid=993",
          "date": "2026-01-22",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_lodging_224198988524_2",
          "tag": "숙소",
          "title": "[마쓰야마](4) 대욕장 비교 : 야마토야 혼텐 vs 히가시도고",
          "subtitle": "[마쓰야마](3) 마쓰야마 야마토야 혼텐 _ 도고온천 료칸 마쓰야마 료칸 _…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://blog.naver.com/newroadnr/224198988524",
          "date": "2026-02-28",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_lodging_224285772971_3",
          "tag": "숙소",
          "title": "오사카 난바 호텔 도톤보리 근처 대욕장 숙소 리스트 추천",
          "subtitle": "안녕하세요. 매일이 여행이고 싶은, 에데여행입니다. 오사카 여행 준비하면서…",
          "image": "https://images.unsplash.com/photo-1754294681773-25c7a42e503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE3ODI1NDEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "난바 호텔 도톤보리 근처 대욕장 숙소 리스트",
          "place_confidence": "low",
          "link": "https://blog.naver.com/nara_day/224285772971",
          "date": "2026-05-14",
          "quality_score": 0.9
        }
      ],
      "restaurants": [
        {
          "id": "마쓰야마_restaurants_541337921002_0",
          "tag": "맛집",
          "title": "마쓰야마 맛집투어! 2-6",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : 一平八平 3. 지역 : 마쓰야…",
          "image": "https://images.unsplash.com/photo-1629684782790-385ed5adb497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fHx8MTc4MjU0MTIxM3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "一平八平",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4133792?boardtype=L&menuid=1002",
          "date": "2025-11-21",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_restaurants_541337971002_1",
          "tag": "맛집",
          "title": "마쓰야마 맛집투어! 3-2",
          "subtitle": "1. 내가주는 추천점수 : 4 2. 상점명 : 코메다 커피 3. 지역 : 마…",
          "image": "https://images.unsplash.com/photo-1629684782790-385ed5adb497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fHx8MTc4MjU0MTIxM3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "코메다 커피",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4133797?boardtype=L&menuid=1002",
          "date": "2025-11-21",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_restaurants_541338041002_2",
          "tag": "맛집",
          "title": "마쓰야마 맛집투어! 3-3",
          "subtitle": "1. 내가주는 추천점수 : 1 2. 상점명 : 미소 돈코쓰 라멘 마루 3.…",
          "image": "https://images.unsplash.com/photo-1629684782790-385ed5adb497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fHx8MTc4MjU0MTIxM3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "미소 돈코쓰 라멘 마루",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4133804?boardtype=L&menuid=1002",
          "date": "2025-11-21",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_restaurants_541337341002_3",
          "tag": "맛집",
          "title": "마쓰야마 먹방투어! 1-1",
          "subtitle": "1. 내가주는 추천점수 : 5 2. 상점명 : Takizawa 3. 지역 :…",
          "image": "https://images.unsplash.com/photo-1629684782790-385ed5adb497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fHx8MTc4MjU0MTIxM3ww&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "Takizawa",
          "place_confidence": "high",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4133734?boardtype=L&menuid=1002",
          "date": "2025-11-20",
          "quality_score": 0.9
        }
      ],
      "snsSpots": [
        {
          "id": "마쓰야마_snsSpots_754227369813_0",
          "tag": "SNS스팟",
          "title": "뒤뚱뒤뚱 마쓰야마 4일차 > ② 이시테지의 비밀 통로 '만트라 동굴' 속으로",
          "subtitle": "2026년 2월 2일 이시테지 본당 뒤편, 입을 벌리고 있는 어두운 동굴이…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": null,
          "place_confidence": "none",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4227369?boardtype=L&menuid=813",
          "date": "2026-02-23",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_snsSpots_224298785986_1",
          "tag": "SNS스팟",
          "title": "마쓰야마 렌터카 근교여행 일본의 스위스 텐구고원과 시코쿠",
          "subtitle": "마쓰야마 렌터카여행의 마지막 코스이자 하이라이트, 일본의 스위스라고 불리는…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "렌터카 근교 일본의 스위스 텐구고원과 시코쿠",
          "place_confidence": "low",
          "link": "https://blog.naver.com/everybean/224298785986",
          "date": "2026-05-28",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_snsSpots_754302099813_2",
          "tag": "SNS스팟",
          "title": "마쓰야마 히가시도고 소라토모리 온천",
          "subtitle": "3박4일로 마쓰야마 혼여 왔어요 오늘이 3일차네요. 첫날은 무료쿠폰으로 마쓰…",
          "image": "https://images.unsplash.com/photo-1549548284-28057f92c497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHwlRUQlOUUlODglRUElQjAlODAlRUMlOEIlOUMlRUIlOEYlODQlRUElQjMlQTAlMjAlRUMlODYlOEMlRUIlOUQlQkMlRUQlODYlQTAlRUIlQUElQTglRUIlQTYlQUMlMjAlRUMlOTglQTglRUMlQjIlOUMlMjBNYXRzdXlhbWElMjBKYXBhbnxlbnwwfHx8fDE3ODI1NDE2ODN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "히가시도고 소라토모리 온천",
          "place_confidence": "low",
          "link": "https://cafe.naver.com/f-e/cafes/10110775/articles/4302099?boardtype=L&menuid=813",
          "date": "2026-05-31",
          "quality_score": 0.9
        },
        {
          "id": "마쓰야마_snsSpots_224299073357_3",
          "tag": "SNS스팟",
          "title": "시코쿠 마쓰야마 2박3일 가족 여행 추천 후기",
          "subtitle": "시코쿠 마쓰야마 2박 3일 가족 여행, 유유버스투어 마쓰야마 근교 일일 버스…",
          "image": "https://images.unsplash.com/photo-1720218954648-eaae60e36671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5ODY3MTd8MHwxfHNlYXJjaHwxfHxNYXRzdXlhbWElMjBKYXBhbiUyMHRvdXJpc3QlMjBsYW5kbWFya3xlbnwwfHx8fDE3ODI1NDEyMTN8MA&ixlib=rb-4.1.0&q=80&w=400",
          "place_name": "시코쿠 2박3일 가족",
          "place_confidence": "low",
          "link": "https://blog.naver.com/makeflow_/224299073357",
          "date": "2026-05-28",
          "quality_score": 0.9
        }
      ]
    }
  }
};

/**
 * 탐색 결과 카드 가져오기.
 * @param city 도시명 (오사카/시즈오카/마쓰야마)
 * @param concept STEP 4에서 고른 여행 컨셉 값(식도락/힐링/핫플/액티비티).
 *                있으면 해당 컨셉에 맞춰 우선순위가 조정된 풀을 사용하고,
 *                없으면(또는 매칭 안 되면) 기본 풀을 사용.
 */
export function getExploreMock(city: string, concept?: string): ExploreResult {
  if (concept && BY_CONCEPT_DATA[city]?.[concept]) {
    return BY_CONCEPT_DATA[city][concept];
  }
  return DEFAULT_DATA[city] ?? DEFAULT_DATA['오사카'];
}
