'use client';

import styles from './chat.module.css';
import RenderContent from './RenderContent';
import PhotoGallery from './PhotoGallery';
import { extractPlaceName, matchPlace } from './placeUtils';
import type { Place } from './types';

interface Props {
  content: string | null | undefined;
  places: Place[];
  onRefClick: (id: number) => void;
}

export default function ContentWithPhotos({ content, places, onRefClick }: Props) {
  if (!content) return null;

  const lines = content.split('\n');

  return (
    <div className={styles.contentWithPhotos}>
      {lines.map((line, i) => {
        if (!line.trim()) {
          return <div key={i} className={styles.contentLineSpacer} aria-hidden="true" />;
        }

        const placeName = extractPlaceName(line);
        const matched = placeName ? matchPlace(placeName, places) : undefined;

        return (
          <div key={i} className={styles.contentLineBlock}>
            <p className={styles.sectionContentLine}>
              <RenderContent content={line} onRefClick={onRefClick} />
            </p>
            {matched?.photo_urls && matched.photo_urls.length > 0 && (
              <PhotoGallery urls={matched.photo_urls.slice(0, 3)} alt={matched.name} />
            )}
          </div>
        );
      })}
    </div>
  );
}
