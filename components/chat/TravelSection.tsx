'use client';

import styles from './chat.module.css';
import RenderContent from './RenderContent';
import ContentWithPhotos from './ContentWithPhotos';
import PhotoGallery from './PhotoGallery';
import ReviewList from './ReviewList';
import { matchPlace } from './placeUtils';
import type { Section, Place } from './types';

const DAY_PATTERN = /^(day\s*\d+|\d+일차)/i;

interface Props {
  section: Section;
  places: Place[];
  onRefClick: (id: number) => void;
  index?: number;
}

function hasPlacesDetail(section: Section): boolean {
  return (section.places_detail?.length ?? 0) > 0;
}

export default function TravelSection({ section, places, onRefClick, index = 0 }: Props) {
  const isDaySection = DAY_PATTERN.test(section.title.trim());
  const usePlaceDetails = hasPlacesDetail(section);
  const hasTable = !!(
    section.table &&
    Array.isArray(section.table.headers) &&
    Array.isArray(section.table.rows) &&
    section.table.rows.length > 0
  );

  const staggerStyle = { '--section-i': index } as React.CSSProperties;
  const contentProps = {
    content: section.content,
    places,
    placesDetail: section.places_detail,
    onRefClick,
  };

  if (hasTable) {
    return (
      <div className={styles.sectionTableBlock} style={staggerStyle}>
        <h3 className={styles.sectionTitle}>
          {section.icon ? <span className={styles.sectionIcon}>{section.icon}</span> : null}
          {section.title}
        </h3>
        <div className={styles.recTextList}>
          {section.table!.rows.map((row, ri) => {
            const [label, ...descCells] = row;
            const matched = matchPlace(label, places);
            return (
              <div key={ri} className={styles.recTextItem}>
                <p className={styles.recTextName}>{ri + 1}. {label}</p>
                {descCells.map((cell, ci) => (
                  <p key={ci} className={styles.recTextDesc}>
                    <RenderContent content={cell} />
                  </p>
                ))}
                {matched?.photo_urls && matched.photo_urls.length > 0 && (
                  <PhotoGallery urls={matched.photo_urls.slice(0, 3)} alt={label} />
                )}
              </div>
            );
          })}
        </div>
        {section.content && (
          <div className={styles.sectionConclusion}>
            <ContentWithPhotos {...contentProps} />
          </div>
        )}
        {!usePlaceDetails && (
          <ReviewList reviews={section.reviews} onRefClick={onRefClick} />
        )}
      </div>
    );
  }

  if (isDaySection) {
    return (
      <div className={styles.sectionDayBlock} style={staggerStyle}>
        <div className={styles.sectionDayHeader}>
          <span className={styles.sectionDayPill}>{section.icon}</span>
          <h3 className={styles.sectionDayTitle}>{section.title}</h3>
          <div className={styles.sectionDayRule} aria-hidden="true" />
        </div>
        <ContentWithPhotos {...contentProps} />
        {!usePlaceDetails && (
          <ReviewList reviews={section.reviews} onRefClick={onRefClick} />
        )}
      </div>
    );
  }

  return (
    <div className={styles.sectionPlainBlock} style={staggerStyle}>
      <h3 className={styles.sectionTitle}>
        {section.icon ? <span className={styles.sectionIcon}>{section.icon}</span> : null}
        {section.title}
      </h3>
      <ContentWithPhotos {...contentProps} />
      {!usePlaceDetails && (
        <ReviewList reviews={section.reviews} onRefClick={onRefClick} />
      )}
    </div>
  );
}
