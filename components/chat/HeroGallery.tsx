'use client';

import styles from './chat.module.css';

interface HeroImage {
  url: string;
  alt: string;
}

interface Props {
  images: HeroImage[];
}

export default function HeroGallery({ images }: Props) {
  if (images.length === 0) return null;

  const shown = images.slice(0, 2);

  if (shown.length === 1) {
    return (
      <div className={styles.heroSingle}>
        <img src={shown[0].url} alt={shown[0].alt} loading="eager" className={styles.heroImg} />
      </div>
    );
  }

  return (
    <div className={styles.heroDuo}>
      {shown.map((img, i) => (
        <div key={i} className={styles.heroDuoItem}>
          <img
            src={img.url}
            alt={img.alt}
            className={styles.heroDuoImg}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  );
}
