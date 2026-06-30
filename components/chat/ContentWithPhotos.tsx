'use client';

import { useMemo } from 'react';
import styles from './chat.module.css';
import RenderContent from './RenderContent';
import PhotoGallery from './PhotoGallery';
import ReviewList from './ReviewList';
import PlaceWarnings from './PlaceWarnings';
import {
  computeItineraryPhotoVisibility,
  findPlaceDetail,
  matchPlace,
  normalizePlaceLabel,
  parseContentItems,
  prepareItineraryContentItems,
  expandPlaceItems,
  isOneLineConclusionLine,
  descriptionToHighlights as highlightsFromDescription,
} from './placeUtils';
import { splitJoinedSentences } from './displayTextUtils';
import type { Place, PlaceDetail } from './types';

interface Props {
  content: string | null | undefined;
  places: Place[];
  placesDetail?: PlaceDetail[];
  onRefClick: (id: number) => void;
  sectionTitle?: string;
  variant?: 'default' | 'conclusion' | 'itinerary';
  /** 상황별 추천 — **장소명** bold */
  boldPlaceNames?: boolean;
}

function descriptionToHighlights(description: string | undefined, placeName: string): string[] {
  return highlightsFromDescription(description, placeName);
}

function ConclusionContent({
  content,
  onRefClick,
  boldPlaceNames = false,
}: {
  content: string;
  onRefClick: (id: number) => void;
  boldPlaceNames?: boolean;
}) {
  return (
    <div className={`${styles.contentWithPhotos} ${styles.contentConclusion}`}>
      {content.split('\n').map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={i} className={styles.contentLineSpacer} aria-hidden="true" />;
        }
        return (
          <div key={i} className={styles.contentLineBlock}>
            <p
              className={
                isOneLineConclusionLine(trimmed)
                  ? styles.conclusionOneLiner
                  : styles.conclusionContentLine
              }
            >
              <RenderContent
                content={trimmed}
                onRefClick={onRefClick}
                plainBold={!boldPlaceNames}
              />
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function ContentWithPhotos({
  content,
  places,
  placesDetail,
  onRefClick,
  sectionTitle,
  variant = 'default',
  boldPlaceNames = false,
}: Props) {
  if (!content) return null;

  const items = useMemo(() => {
    if (variant === 'conclusion') return [];
    const parsed = parseContentItems(content, sectionTitle, {
      itinerary: variant === 'itinerary',
    });
    if (variant === 'itinerary') {
      return prepareItineraryContentItems(parsed, placesDetail);
    }
    return expandPlaceItems(parsed, placesDetail, sectionTitle);
  }, [content, sectionTitle, variant, placesDetail]);

  if (variant === 'conclusion') {
    return (
      <ConclusionContent
        content={content}
        onRefClick={onRefClick}
        boldPlaceNames={boldPlaceNames}
      />
    );
  }

  const hasPlaceDetails = (placesDetail?.length ?? 0) > 0;
  const itineraryPhotoVisibility = useMemo(
    () =>
      variant === 'itinerary' ? computeItineraryPhotoVisibility(items, places) : null,
    [variant, items, places]
  );
  /** 섹션 내 설명·warning — 동일 ref는 첫 표기만 */
  const descriptionDedupeRefs = useMemo(() => new Set<number>(), [content]);

  return (
    <div className={styles.contentWithPhotos}>
      {items.map((item, i) => {
        if (item.kind === 'spacer') {
          return <div key={i} className={styles.contentLineSpacer} aria-hidden="true" />;
        }

        if (item.kind === 'subheading') {
          return (
            <p key={i} className={styles.contentSubheading}>
              {item.text}
            </p>
          );
        }

        if (item.kind === 'plain') {
          return (
            <div key={i} className={styles.contentLineBlock}>
              <p className={styles.sectionContentLine}>
                <RenderContent content={item.text} onRefClick={onRefClick} />
              </p>
            </div>
          );
        }

        const placeName = item.placeName;
        const matched = matchPlace(placeName, places);
        const detail = findPlaceDetail(placeName, placesDetail);
        const displayName =
          detail?.name &&
          normalizePlaceLabel(placeName) !== normalizePlaceLabel(detail.name) &&
          (placeName.includes(detail.name) || placeName.length > detail.name.length + 6)
            ? detail.name
            : placeName;
        const matchedForPhoto = matchPlace(displayName, places) ?? matched;
        const highlights =
          item.highlights.length > 0
            ? item.highlights
            : descriptionToHighlights(detail?.description, displayName);

        const showPhoto =
          matchedForPhoto?.photo_urls &&
          matchedForPhoto.photo_urls.length > 0 &&
          (variant !== 'itinerary' || itineraryPhotoVisibility?.get(i));

        return (
          <div key={i} className={styles.contentPlaceBlock}>
            <p className={styles.contentPlaceHeader}>
              <span className={styles.contentPlaceEmoji} aria-hidden="true">
                {item.emoji}
              </span>
              <strong>{displayName}</strong>
            </p>

            {highlights.length > 0 && (
              <ul className={styles.placeHighlights}>
                {highlights.flatMap((text) => splitJoinedSentences(text)).map((text, hi) => (
                  <li key={hi} className={styles.placeHighlightItem}>
                    <RenderContent
                      content={text}
                      onRefClick={onRefClick}
                      dedupeRefs={descriptionDedupeRefs}
                    />
                  </li>
                ))}
              </ul>
            )}

            {detail?.warnings && detail.warnings.length > 0 && (
              <PlaceWarnings
                warnings={detail.warnings}
                onRefClick={onRefClick}
                dedupeRefs={descriptionDedupeRefs}
              />
            )}

            {showPhoto && (
              <PhotoGallery
                urls={matchedForPhoto!.photo_urls!.slice(0, 3)}
                alt={matchedForPhoto!.name}
              />
            )}

            {hasPlaceDetails && detail && detail.reviews.length > 0 && (
              <div className={styles.placeDetailReviews}>
                <ReviewList
                  reviews={detail.reviews}
                  onRefClick={onRefClick}
                  placeName={detail.name}
                  description={detail.description}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
