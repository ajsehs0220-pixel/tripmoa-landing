'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import styles from './chat.module.css';
import MapLoader from '@/components/MapLoader';
import type { Place } from './types';

interface Props {
  places: Place[];
  visiblePlaces: Place[];
  dayList: number[];
  activeDay: number | null;
  onDayChange: (day: number) => void;
}

export default function MapSection({
  places,
  visiblePlaces,
  dayList,
  activeDay,
  onDayChange,
}: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const visiblePlacesKey = useMemo(
    () => visiblePlaces.map((p) => `${p.name}:${p.lat}:${p.lng}`).join('|'),
    [visiblePlaces]
  );

  const hasDayTabs = dayList.length > 0;
  const showNameTabs = !hasDayTabs && visiblePlaces.length > 1;

  useEffect(() => {
    setSelectedIdx(null);
    cardRefs.current = [];
    stripRef.current?.scrollTo({ left: 0 });
  }, [visiblePlacesKey]);

  const handleMapLoad = useCallback((map: unknown) => {
    mapInstanceRef.current = map;
  }, []);

  const scrollCardIntoView = useCallback((idx: number) => {
    const card = cardRefs.current[idx];
    const strip = stripRef.current;
    if (!card || !strip) return;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const stripWidth = strip.offsetWidth;
    strip.scrollTo({ left: cardLeft - (stripWidth - cardWidth) / 2, behavior: 'smooth' });
  }, []);

  const handleMarkerSelect = useCallback((idx: number | null) => {
    setSelectedIdx(idx);
    if (idx !== null) scrollCardIntoView(idx);
  }, [scrollCardIntoView]);

  // 카드 클릭: 살짝 잘려서 보이는(peek) 카드를 클릭해도 중앙으로 스크롤되도록
  // selectedIdx와 무관하게 항상 scrollCardIntoView를 호출한다.
  // 이미 활성화된 카드를 다시 클릭한 경우엔 스크롤이 사실상 no-op이라 자연스럽다.
  const handleCardClick = useCallback((place: Place, idx: number) => {
    setSelectedIdx(idx);
    scrollCardIntoView(idx);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: place.lat, lng: place.lng });
    }
  }, [scrollCardIntoView]);

  const handleNameTabClick = useCallback((idx: number) => {
    const place = visiblePlaces[idx];
    if (!place) return;
    setSelectedIdx(idx);
    scrollCardIntoView(idx);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: place.lat, lng: place.lng });
    }
  }, [visiblePlaces, scrollCardIntoView]);

  if (places.length === 0) return null;

  return (
    <div className={styles.mapSection}>
      {/* Search query label — text only */}
      <p className={styles.mapQueryLabel}>
        <svg className={styles.mapQueryIcon} width="14" height="17" viewBox="0 0 16 20" fill="none" aria-hidden="true">
          <path d="M8 0C4.686 0 2 2.686 2 6c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" fill="currentColor" />
          <circle cx="8" cy="6" r="2.4" fill="white" />
        </svg>
        <strong>추천 장소</strong>
      </p>

      {/* Map */}
      <div className={styles.mapStage}>
        <div className={styles.mapStageInner}>
          {/* Day tabs — float at top-center of map */}
          {hasDayTabs && (
            <div className={styles.dayTabs}>
              {dayList.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`${styles.dayTab} ${activeDay === d ? styles.dayTabActive : ''}`}
                  onClick={() => onDayChange(d)}
                >
                  Day {d}
                </button>
              ))}
            </div>
          )}

          {/* Place-name tabs — when no day data */}
          {showNameTabs && (
            <div className={styles.dayTabs}>
              {visiblePlaces.map((p, idx) => (
                <button
                  key={`${p.name}-${idx}`}
                  type="button"
                  className={`${styles.dayTab} ${selectedIdx === idx ? styles.dayTabActive : ''}`}
                  onClick={() => handleNameTabClick(idx)}
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}

          {/* Map canvas */}
          <div className={styles.mapContainer}>
            <MapLoader
              locations={places.map((p) => ({
                name: p.name,
                lat: p.lat,
                lng: p.lng,
                image: p.photo_urls?.[0] ?? null,
                day: p.day,
              }))}
              activeDay={hasDayTabs ? activeDay : null}
              selectedIndex={selectedIdx}
              onMarkerSelect={handleMarkerSelect}
              onMapLoad={handleMapLoad}
            />
          </div>

          {/* Place cards — overlay strip at bottom of map */}
          <div className={styles.placeStripWrap}>
            <div className={styles.placeStrip} ref={stripRef}>
              {visiblePlaces.map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  data-place-card
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={`${styles.placeStripCard} ${selectedIdx === i ? styles.placeStripCardActive : ''}`}
                  onClick={() => handleCardClick(p, i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${p.name} 선택`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(p, i);
                    }
                  }}
                >
                  {p.photo_urls?.[0] ? (
                    <img
                      className={styles.placeStripImg}
                      src={p.photo_urls[0]}
                      alt={p.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.placeStripImgPlaceholder}>
                      <span>{i + 1}</span>
                    </div>
                  )}
                  <div className={styles.placeStripInfo}>
                    <span className={styles.placeStripName}>
                      <span className={styles.placeStripNum}>{i + 1}</span>
                      {p.name}
                    </span>
                    {p.rating != null && (
                      <span className={styles.placeStripRating}>★ {p.rating.toFixed(1)}</span>
                    )}
                    {p.description && (
                      <span className={styles.placeStripDesc}>{p.description}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}