'use client';

import styles from './chat.module.css';
import RenderContent from './RenderContent';
import PhotoGallery from './PhotoGallery';
import ReviewList from './ReviewList';
import { extractPlaceName, matchPlace, findPlaceDetail } from './placeUtils';
import type { Place, PlaceDetail } from './types';

interface Props {
  content: string | null | undefined;
  places: Place[];
  placesDetail?: PlaceDetail[];
  onRefClick: (id: number) => void;
}

export default function ContentWithPhotos({
  content,
  places,
  placesDetail,
  onRefClick,
}: Props) {
  if (!content) return null;

  const lines = content.split('\n');
  const hasPlaceDetails = (placesDetail?.length ?? 0) > 0;

  return (
    <div className={styles.contentWithPhotos}>
      {lines.map((line, i) => {
        if (!line.trim()) {
          return <div key={i} className={styles.contentLineSpacer} aria-hidden="true" />;
        }

        const placeName = extractPlaceName(line);
        const matched = placeName ? matchPlace(placeName, places) : undefined;
        const detail = placeName ? findPlaceDetail(placeName, placesDetail) : undefined;

        return (
          <div key={i} className={styles.contentLineBlock}>
            <p className={styles.sectionContentLine}>
              <RenderContent content={line} onRefClick={onRefClick} />
            </p>
            {matched?.photo_urls && matched.photo_urls.length > 0 && (
              <PhotoGallery urls={matched.photo_urls.slice(0, 3)} alt={matched.name} />
            )}
            {hasPlaceDetails && detail && detail.reviews.length > 0 && (
              <div className={styles.placeDetailReviews}>
                <ReviewList reviews={detail.reviews} onRefClick={onRefClick} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
