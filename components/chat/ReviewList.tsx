'use client';

import styles from './chat.module.css';
import RenderContent from './RenderContent';
import RefBadge from './RefBadge';
import type { Review } from './types';

interface Props {
  reviews: Review[] | null | undefined;
  onRefClick: (id: number) => void;
}

export default function ReviewList({ reviews, onRefClick }: Props) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className={styles.reviewList}>
      {reviews.map((review, i) => {
        const hasInlineRef = /\[ref:\d+\]/.test(review.text ?? '');

        return (
          <blockquote
            key={i}
            className={`${styles.reviewCard} ${
              review.sentiment === 'negative' ? styles.reviewNegative : styles.reviewPositive
            }`}
          >
            <p className={styles.reviewText}>
              <RenderContent content={review.text} onRefClick={onRefClick} />
            </p>
            <footer className={styles.reviewMeta}>
              {review.date && <span className={styles.reviewDate}>{review.date}</span>}
              {review.ref != null && !hasInlineRef && (
                <RefBadge
                  id={review.ref}
                  onClick={() => onRefClick(review.ref!)}
                />
              )}
            </footer>
          </blockquote>
        );
      })}
    </div>
  );
}
