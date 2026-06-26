'use client';

import { useMemo } from 'react';
import styles from './chat.module.css';
import AIAnalysisCard from './AIAnalysisCard';
import HeroGallery from './HeroGallery';
import TravelSection from './TravelSection';
import MapSection from './MapSection';
import SourceAccordion from './SourceAccordion';
import FollowUpChips from './FollowUpChips';
import type { SearchResponse, Place } from './types';

interface Props {
  result: SearchResponse;
  query: string;
  genTime: number;
  places: Place[];
  dayList: number[];
  activeDay: number | null;
  setActiveDay: (day: number) => void;
  onRefClick: (id: number) => void;
  onFollowUpClick: (q: string) => void;
  onSourceClick: (url: string) => void;
}

export default function AssistantMessage({
  result,
  query,
  genTime,
  places,
  dayList,
  activeDay,
  setActiveDay,
  onRefClick,
  onFollowUpClick,
  onSourceClick,
}: Props) {
  const sections = Array.isArray(result.sections) ? result.sections : [];
  const sources = Array.isArray(result.sources) ? result.sources : [];
  const warnings = Array.isArray(result.warning) ? result.warning : [];
  const followUps = Array.isArray(result.follow_up) ? result.follow_up : [];

  const visiblePlaces = dayList.length > 0
    ? places.filter((p) => p.day === activeDay)
    : places;

  // Deduplicated hero images (max 8, first image loads eager)
  const heroImages = useMemo(() => {
    const seen = new Set<string>();
    return places
      .filter((p) => {
        if (!p.photo_url || seen.has(p.photo_url)) return false;
        seen.add(p.photo_url);
        return true;
      })
      .map((p) => ({ url: p.photo_url!, alt: p.name }))
      .slice(0, 8);
  }, [places]);

  return (
    <div className={styles.assistantRow}>
      <div className={styles.assistantContent}>

        {/* Hero image gallery */}
        {heroImages.length > 0 && <HeroGallery images={heroImages} />}

        {/* AI metadata — compact single line */}
        <AIAnalysisCard
          reviewCount={sources.length}
          placeCount={places.length}
          genTime={genTime}
        />

        {/* Summary */}
        {result.summary && (
          <p className={styles.summaryText}>{result.summary}</p>
        )}

        {/* Inline warnings */}
        {warnings.length > 0 && (
          <div className={styles.inlineWarnings}>
            {warnings.map((w, i) => (
              <p key={i} className={styles.inlineWarning}>⚠️ {w}</p>
            ))}
          </div>
        )}

        {/* Travel plan sections (staggered) */}
        {sections.length === 0 ? (
          <p className={styles.emptyMsg}>매칭되는 후기를 찾지 못했어요. 검색어를 바꿔보세요.</p>
        ) : (
          <div className={styles.sectionFlow}>
            {sections.map((sec, i) => (
              <TravelSection
                key={i}
                section={sec}
                places={places}
                onRefClick={onRefClick}
                index={i}
              />
            ))}
          </div>
        )}

        {/* Interactive map */}
        <MapSection
          places={places}
          visiblePlaces={visiblePlaces}
          dayList={dayList}
          activeDay={activeDay}
          onDayChange={setActiveDay}
          query={query}
        />

        {/* Sources accordion */}
        <SourceAccordion sources={sources} onSourceClick={onSourceClick} />

        {/* Follow-up suggestion chips */}
        <FollowUpChips questions={followUps} onSelect={onFollowUpClick} />

      </div>
    </div>
  );
}
