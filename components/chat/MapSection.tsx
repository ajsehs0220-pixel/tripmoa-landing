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
  query: string;
}

export default function MapSection({
  places,
  visiblePlaces,
  dayList,
  activeDay,
  onDayChange,
  query,
}: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const showStripNav = visiblePlaces.length > 1;
  const visiblePlacesKey = useMemo(
    () => visiblePlaces.map((p) => `${p.name}:${p.lat}:${p.lng}`).join('|'),
    [visiblePlaces]
  );

  const updateStripNav = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 2);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    updateStripNav();
    el.addEventListener('scroll', updateStripNav, { passive: true });
    const ro = new ResizeObserver(updateStripNav);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateStripNav);
      ro.disconnect();
    };
  }, [updateStripNav, visiblePlacesKey]);

  useEffect(() => {
    setSelectedIdx(null);
    cardRefs.current = [];
    stripRef.current?.scrollTo({ left: 0 });
  }, [visiblePlacesKey]);

  const scrollStrip = (dir: -1 | 1) => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-place-card]');
    const gap = 10;
    const amount = card ? card.offsetWidth + gap : 168;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

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

  const handleCardClick = useCallback((place: Place, idx: number) => {
    setSelectedIdx(idx);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: place.lat, lng: place.lng });
    }
  }, []);

  if (places.length === 0) return null;

  return (
    <div className={styles.mapSection}>
      {/* Search Capsule — above the map */}
      <div className={styles.searchCapsule}>
        <svg className={styles.searchCapsuleIcon} width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M8 0C4.686 0 2 2.686 2 6c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" fill="#EA4335"/>
          <circle cx="8" cy="6" r="2.4" fill="white"/>
        </svg>
        <span className={styles.searchCapsuleText}>{query}</span>
      </div>

      {/* Map */}
      <div className={styles.mapStage}>
        <div className={styles.mapStageInner}>
          {/* Day tabs — float at top-center of map */}
          {dayList.length > 0 && (
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
              activeDay={dayList.length > 0 ? activeDay : null}
              selectedIndex={selectedIdx}
              onMarkerSelect={handleMarkerSelect}
              onMapLoad={handleMapLoad}
            />
          </div>
        </div>
      </div>

      {/* Place cards — below the map */}
      <div className={styles.placeStripWrap}>
        {showStripNav && (
          <button
            type="button"
            className={`${styles.placeStripNav} ${styles.placeStripNavPrev}`}
            onClick={() => scrollStrip(-1)}
            disabled={!canPrev}
            aria-label="이전 장소"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

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
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(p, i); }}
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
                <span className={styles.placeStripNum}>{i + 1}</span>
                <span className={styles.placeStripName}>{p.name}</span>
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

        {showStripNav && (
          <button
            type="button"
            className={`${styles.placeStripNav} ${styles.placeStripNavNext}`}
            onClick={() => scrollStrip(1)}
            disabled={!canNext}
            aria-label="다음 장소"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
