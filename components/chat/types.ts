export type TableData = { headers: string[]; rows: string[][] };
export type Review = {
  text: string;
  sentiment: 'positive' | 'negative';
  date?: string;
  ref?: number;
};
export type PlaceDetail = {
  name: string;
  description: string;
  reviews: Review[];
  /** 해당 장소 주의사항 (막차, 휴무, 예약 필수 등) */
  warnings?: string[];
};
export type Section = {
  icon: string;
  title: string;
  content: string;
  places_detail?: PlaceDetail[];
  /** @deprecated 섹션 레벨 reviews — places_detail 사용 */
  reviews?: Review[];
  table: TableData | null;
};
export type Place = {
  day: number | null;
  name: string;
  lat: number;
  lng: number;
  photo_urls?: string[];
  rating?: number | null;
  description: string;
};
export type Source = {
  id: number;
  title: string;
  channel: string;
  date: string;
  link: string;
  /** 청크 본문 앞부분 — 제목: 줄 추출용 */
  text_preview?: string;
  /** 광고/협찬 후기 여부 */
  is_ad?: boolean;
};
export type YoutubeVideo = { title: string; url: string; summary?: string };
export type SearchResponse = {
  summary: string;
  sections: Section[];
  warning: string[];
  places: Place[] | null;
  follow_up: string[];
  sources: Source[];
  youtube_videos?: YoutubeVideo[];
  map_title?: string;
};
