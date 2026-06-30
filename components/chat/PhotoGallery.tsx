'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './chat.module.css';

interface Props {
  urls: string[];
  alt: string;
}

const SWIPE_THRESHOLD = 40;

export default function PhotoGallery({ urls, alt }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const stripDrag = useRef<{ startX: number; scrollLeft: number } | null>(null);
  const stripDidDrag = useRef(false);

  const items = urls.slice(0, 4);
  const showCounter = items.length > 1;
  const isLightboxOpen = lightboxIndex !== null;

  const stepLightbox = (dir: -1 | 1) => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + dir + items.length) % items.length;
    });
  };

  const finishSwipe = (startX: number, endX: number) => {
    if (items.length <= 1) return;
    const dx = endX - startX;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    stepLightbox(dx > 0 ? -1 : 1);
  };

  const onLightboxPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onLightboxPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    finishSwipe(dragStartX.current, e.clientX);
    dragStartX.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onLightboxPointerCancel = (e: React.PointerEvent) => {
    dragStartX.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onStripPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.pointerType !== 'mouse') return;
    const el = stripRef.current;
    if (!el) return;
    stripDidDrag.current = false;
    stripDrag.current = { startX: e.clientX, scrollLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };

  const onStripPointerMove = (e: React.PointerEvent) => {
    const drag = stripDrag.current;
    const el = stripRef.current;
    if (!drag || !el) return;
    if (Math.abs(e.clientX - drag.startX) > 5) {
      stripDidDrag.current = true;
    }
    el.scrollLeft = drag.scrollLeft - (e.clientX - drag.startX);
  };

  const endStripDrag = (e: React.PointerEvent) => {
    stripDrag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        return;
      }
      if (items.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((i) => (i === null ? null : (i + 1) % items.length));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isLightboxOpen, items.length]);

  const openLightbox = (index: number) => {
    if (stripDidDrag.current) return;
    setLightboxIndex(index);
  };
  const closeLightbox = () => setLightboxIndex(null);

  if (items.length === 0) return null;

  const lightbox =
    isLightboxOpen && typeof document !== 'undefined'
      ? createPortal(
          <div
            className={styles.photoLightboxBackdrop}
            role="dialog"
            aria-modal="true"
            aria-label={`${alt} 사진 크게 보기`}
            onClick={closeLightbox}
          >
            <button
              type="button"
              className={styles.photoLightboxClose}
              onClick={closeLightbox}
              aria-label="닫기"
            >
              ✕
            </button>

            <figure
              className={styles.photoLightboxFigure}
              onClick={(e) => e.stopPropagation()}
              onPointerDown={onLightboxPointerDown}
              onPointerUp={onLightboxPointerUp}
              onPointerCancel={onLightboxPointerCancel}
            >
              <img
                className={styles.photoLightboxImg}
                src={items[lightboxIndex!]}
                alt={`${alt} ${lightboxIndex! + 1}`}
                draggable={false}
              />
              {showCounter && (
                <figcaption className={styles.photoLightboxCounter}>
                  {lightboxIndex! + 1} / {items.length}
                </figcaption>
              )}
            </figure>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className={styles.photoGalleryWrap}>
        <div
          ref={stripRef}
          className={styles.photoGalleryStrip}
          role="list"
          aria-label={`${alt} 사진`}
          onPointerDown={onStripPointerDown}
          onPointerMove={onStripPointerMove}
          onPointerUp={endStripDrag}
          onPointerCancel={endStripDrag}
        >
          {items.map((url, i) => (
            <div key={i} className={styles.photoGallerySlide} role="listitem" data-photo-slide>
              <button
                type="button"
                className={styles.photoGallerySlideBtn}
                onClick={() => openLightbox(i)}
                aria-label={`${alt} ${i + 1} 크게 보기`}
              >
                <img
                  className={styles.photoGallerySlideImg}
                  src={url}
                  alt={`${alt} ${i + 1}`}
                  loading="lazy"
                  draggable={false}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {lightbox}
    </>
  );
}
