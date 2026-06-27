'use client';

import styles from './chat.module.css';

interface Props {
  urls: string[];
  alt: string;
}

export default function PhotoGallery({ urls, alt }: Props) {
  if (!urls || urls.length === 0) return null;

  if (urls.length <= 2) {
    return (
      <div className={styles.photoGalleryLarge}>
        {urls.map((url, i) => (
          <img
            key={i}
            className={styles.photoGalleryLargeImg}
            src={url}
            alt={`${alt} ${i + 1}`}
            loading="lazy"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.photoGalleryGrid}>
      {urls.slice(0, 4).map((url, i) => (
        <img
          key={i}
          className={styles.photoGalleryGridImg}
          src={url}
          alt={`${alt} ${i + 1}`}
          loading="lazy"
        />
      ))}
    </div>
  );
}
