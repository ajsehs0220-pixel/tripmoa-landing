'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import styles from './chat.module.css';

interface Props {
  urls: string[];
  alt: string;
}

export default function PhotoGallery({ urls, alt }: Props) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const items = urls.slice(0, 4);
  const showNav = items.length > 1;

  const updateButtons = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 2);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener('scroll', updateButtons, { passive: true });
    const ro = new ResizeObserver(updateButtons);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateButtons);
      ro.disconnect();
    };
  }, [updateButtons, items.length]);

  const scrollBySlide = (dir: -1 | 1) => {
    const el = stripRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>(`[data-photo-slide]`);
    const gap = 8;
    const amount = slide ? slide.offsetWidth + gap : el.clientWidth * 0.78;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  if (items.length === 0) return null;

  return (
    <div className={styles.photoGalleryWrap}>
      {showNav && (
        <button
          type="button"
          className={`${styles.photoGalleryNav} ${styles.photoGalleryNavPrev}`}
          onClick={() => scrollBySlide(-1)}
          disabled={!canPrev}
          aria-label="이전 사진"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <div
        ref={stripRef}
        className={styles.photoGalleryStrip}
        role="list"
        aria-label={`${alt} 사진`}
      >
        {items.map((url, i) => (
          <div key={i} className={styles.photoGallerySlide} role="listitem" data-photo-slide>
            <img
              className={styles.photoGallerySlideImg}
              src={url}
              alt={`${alt} ${i + 1}`}
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {showNav && (
        <button
          type="button"
          className={`${styles.photoGalleryNav} ${styles.photoGalleryNavNext}`}
          onClick={() => scrollBySlide(1)}
          disabled={!canNext}
          aria-label="다음 사진"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
