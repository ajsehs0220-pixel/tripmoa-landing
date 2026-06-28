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
export type Source = { id: number; title: string; channel: string; date: string; link: string };
export type SearchResponse = {
  summary: string;
  sections: Section[];
  warning: string[];
  places: Place[] | null;
  follow_up: string[];
  sources: Source[];
};
