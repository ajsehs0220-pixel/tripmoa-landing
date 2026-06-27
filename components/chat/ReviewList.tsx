'use client';

import styles from './chat.module.css';
import type { Review } from './types';

interface Props {
  reviews: Review[] | null | undefined;
  onRefClick: (id: number) => void;
}

export default function ReviewList({ reviews, onRefClick }: Props) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className={styles.reviewList}>
      {reviews.map((review, i) => (
        <blockquote
          key={i}
          className={`${styles.reviewCard} ${
            review.sentiment === 'negative' ? styles.reviewNegative : styles.reviewPositive
          }`}
        >
          <p className={styles.reviewText}>{review.text}</p>
          <footer className={styles.reviewMeta}>
            {review.date && <span className={styles.reviewDate}>{review.date}</span>}
            {review.ref != null && (
              <button
                type="button"
                className={styles.refBadge}
                onClick={() => onRefClick(review.ref!)}
                aria-label={`출처 ${review.ref}번 보기`}
              >
                {review.ref}
              </button>
            )}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
