'use client';

import styles from './chat.module.css';
import RenderContent from './RenderContent';
import ContentWithPhotos from './ContentWithPhotos';
import PhotoGallery from './PhotoGallery';
import ReviewList from './ReviewList';
import { formatSectionTitle, formatDaySectionTitle, isConclusionSection, isDaySectionTitle, isLodgingSection, matchPlace, keycapNumberEmoji, extractDayNumber } from './placeUtils';
import type { Section, Place } from './types';

interface Props {
  section: Section;
  places: Place[];
  onRefClick: (id: number) => void;
  index?: number;
  daySectionCount?: number;
}

function hasPlacesDetail(section: Section): boolean {
  return (section.places_detail?.length ?? 0) > 0;
}

export default function TravelSection({ section, places, onRefClick, index = 0, daySectionCount = 0 }: Props) {
  const isDaySection = isDaySectionTitle(section.title);
  const usePlaceDetails = hasPlacesDetail(section);
  const hasTable = !!(
    section.table &&
    Array.isArray(section.table.headers) &&
    Array.isArray(section.table.rows) &&
    section.table.rows.length > 0
  );

  const staggerStyle = { '--section-i': index } as React.CSSProperties;
  const displayTitle = formatSectionTitle(section.title, section.icon);
  const isConclusion = isConclusionSection(section.title, section.icon);
  const isSituationRec =
    isConclusion && /상황별/i.test(displayTitle) && !/여행\s*팁/i.test(displayTitle);
  const isLodging = isLodgingSection(section.title, section.icon);
  const hideIcon = isLodging || /^💡/.test(displayTitle.trim());

  const isTravelTip =
    isConclusion && /여행\s*팁/i.test(displayTitle);

  const isCompactTitle = isTravelTip || isSituationRec;

  const blockClassName = [
    styles.sectionPlainBlock,
    isCompactTitle ? styles.sectionCompactTitleBlock : '',
    isTravelTip ? styles.sectionTravelTipBlock : '',
    isSituationRec ? styles.sectionSituationRecBlock : '',
  ]
    .filter(Boolean)
    .join(' ');

  const contentProps = {
    content: section.content,
    places,
    placesDetail: section.places_detail,
    onRefClick,
    sectionTitle: section.title,
    variant: isConclusion ? ('conclusion' as const) : isDaySection ? ('itinerary' as const) : ('default' as const),
    boldPlaceNames: isSituationRec,
  };

  if (hasTable) {
    return (
      <div className={styles.sectionTableBlock} style={staggerStyle}>
        <h3 className={styles.sectionTitle}>
          {section.icon && !hideIcon ? (
            <span className={styles.sectionIcon}>{section.icon}</span>
          ) : null}
          {displayTitle}
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
    const dayNum = extractDayNumber(section.title) ?? extractDayNumber(formatDaySectionTitle(section.title));
    return (
      <div className={styles.sectionDayBlock} style={staggerStyle}>
        <div className={styles.sectionDayHeader}>
          {dayNum != null && (
            <span className={styles.sectionDayPill} aria-hidden="true">
              {keycapNumberEmoji(dayNum)}
            </span>
          )}
          <h3 className={styles.sectionDayTitle}>{formatDaySectionTitle(section.title)}</h3>
        </div>
        <ContentWithPhotos {...contentProps} />
        {!usePlaceDetails && (
          <ReviewList reviews={section.reviews} onRefClick={onRefClick} />
        )}
      </div>
    );
  }

  return (
    <div className={blockClassName} style={staggerStyle}>
      <h3 className={styles.sectionTitle}>
        {isLodging ? (
          <span className={styles.sectionIcon} aria-hidden="true">
            {keycapNumberEmoji(daySectionCount + 1)}
          </span>
        ) : section.icon && !hideIcon ? (
          <span className={styles.sectionIcon}>{section.icon}</span>
        ) : null}
        {displayTitle}
      </h3>
      {isConclusion ? (
        <div className={styles.sectionConclusion}>
          <ContentWithPhotos {...contentProps} />
        </div>
      ) : (
        <ContentWithPhotos {...contentProps} />
      )}
      {!usePlaceDetails && (
        <ReviewList reviews={section.reviews} onRefClick={onRefClick} />
      )}
    </div>
  );
}
